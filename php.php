<?php
error_reporting(E_ALL);

//public - доступны как в текущем классе так и из внешней программы
//protected - доступны только текущему классу и его наследникам
//private - доступны только в классе

//Простой пример
class demo1_class {
	public $title;//обеспечивает доступ к методу извне класса
	//для php4 конструктор выглядит так: public function demo1_class($title)
	//в php5 если не будет найден метод __construct() будет искатся метод demo1_class()
	//$title = '123';//Parse error: syntax error, unexpected T_VARIABLE, expecting T_FUNCTION
	public function __construct($message, $robot) {//автоматически вызывается при создании класса
		echo $message.' ('.$robot.')<br>';
	}
	public function __destruct() {//автоматически вызывается при удалении класса, не может иметь параметров
		echo 'До свидания<br>';
	}
	public function say_hello($name) {
		echo '1) Здравсвуйте '.$this->title.' '.$name;
	}
}

//Вызов простого примера
$demo1_class = new demo1_class('Я искуственный интеллект', 'Робот');//создаем объект класса, входная переменная попадет в конструктор
$demo1_class->title = 'гражданин';
$demo1_class->say_hello('Станислав');//вызываем метод класса
echo '<hr>';

//Методы доступа
class demo2_class {
	//знак _ означает что атрибут или метод закрытые
	private $_name;//доступ к атрибуту возможен только из класса
	public function say_hello() {
		echo '2) Здравствуйте '.$this->get_name();
	}
	public function get_name() {
		return $this->_name;
	}
	//вместо обычной установки метода класса предусматриваем метод класса который будет проверять входные данные на корректность accessor method
	public function set_name($new_name) {
		if(!is_string($new_name) || $new_name == '') {
			throw new Exception('Неверное значение имени'."<br>\n");
		}
		$this->_name = $new_name;
	}
}

//Вызов методов доступа
try {//при не верном значении имени может возникнуть ошибка
	$demo2_class = new demo2_class();
	$demo2_class->set_name('Станислав');
	//$demo2_class->set_name(123);
	$demo2_class->say_hello();
} catch (Exception $e) {
	exit('Произошла ошибка: '.$e->getMessage());
}
echo '<hr>';

//Наследование
class site {
	public $site_name;
	public function get_page_content() {
		  echo 'This is page content'."<br>\n";
	}
	public function get_page_title($page_id) {
		  echo 'This is page title of page '.$page_id."<br>\n";
	}
}

class shop extends site {
	function __construct() {
		$this->site_name = 'Shop title'."<br>\n";//переопределять члены можно только в функциях
	}
	//перезагружаем метод
	public function get_page_content() {
		  echo 'This is shop content'."<br>\n";
	}
	//добавляем в существующий метод новые строки кода
	public function get_page_title($page_id) {
		 parent::get_page_title($page_id);//копируем все строки из наследуемого метода в наш метод
		 echo '(seo is cool)'."<br>\n";
	}
	//добавляем новый метод
	function get_basket_content() {
		echo '+ Basket content'."<br>\n";
	}
}

//Вызов наследования
$site = new site();
$site->site_name = 'Site title'."<br>\n";
echo $site->site_name;
$site->get_page_content();
$site->get_page_title('01');
echo '<br>';
$shop = new shop();
echo $shop->site_name;
$shop->get_page_content();
$shop->get_page_title('02');
$shop->get_basket_content();
echo '<hr>';

//Создание интерфейса
interface make_site {//синтаксис такой же как и у классов
//переменные-члены отсутствуют
	//public $property;//Fatal error: Interfaces may not include member variables
//методы не реализуются и объявляются как общедоступные
	//abstract function make_design();//Fatal error: Access type for interface method make_site::make_design() must be omitted
	//private function make_design();//Fatal error: Access type for interface method make_site::make_design() must be omitted
//класс реализующий данный метод, должен обеспечить реализацию всех его методов
	public function make_design();
	public function make_html_code();
	public function make_programming();
}
class developer implements make_site {
//если не реализовать какой нибудь метод интерфейса, получаем ошибку
//Fatal error: Class developer contains 1 abstract method and must therefore be declared abstract or implement the remaining methods (make_site::make_design)
	public function make_design() {
		echo '1) make design'."<br>\n";
	}
	public function make_html_code() {
		echo '2) make html code'."<br>\n";
	}
	public function make_programming() {
		echo '3) make programming'."<br>\n";
	}
}
//Вызов интерфейса
$obj_developer = new developer();
$obj_developer->make_design();
$obj_developer->make_html_code();
$obj_developer->make_programming();
echo '<hr>';

?>