<?php
// Тестируемые классы
class UserManager {
    private $_users = array();
    
    public function addUser($name, $email, $password) {
        if (array_key_exists($name, $this->_users)) {
            throw new UserException('Такой пользователь уже существует!');
        } else {
            $this->_users[$name] = new User($name, $email, $password);
        }
        
    }
    
    public function getUser($name) {
        if (array_key_exists($name, $this->_users)) {
            return $this->_users[$name];
        } else {
            throw new UserException('Такой пользователь не существует!');
        }
    }
    
    public function deleteUser($name) {
        if (array_key_exists($name, $this->_users)) {
            unset($this->_users[$name]);
        } else {
            throw new UserException('Такой пользователь не существует!');
        }
    }
}

class User {
    private $_name;
    private $_email;
    private $_password;
    
    public function __construct($name, $email, $password) {
        if (strlen($password) < 5) {
            throw new UserException('Пароль слишком короткий');
        } else {
            $this->_name = $name;
            $this->_email = $email;
            $this->_password = $password;
        }
    }
    
    public function getName() {
        return $this->_name;
    }
    
    public function getEmail() {
        return $this->_email;
    }
    
    public function getPassword() {
        return $this->_password;
    }
}

class UserException extends Exception { }

// Классы выполняющие тестирование
class UserTest extends PHPUnit_Framework_TestCase { // Название класса лучше именовать как ТестируемыйКлассTest
    public function testConstructor() {
        // Ожидаем исключение, т.к. пароль меньше 5 символов
        try {
            new User('admin5', 'admin5@mail.com', 'pass');
        } catch (UserException $e) {
            return;
        }
        $this->fail('An expected exception has not been raised');
        
        // Правильно добавляем пользователя
        $user = new User('admin6', 'admin6@mail.com', 'password6');
        $this->assertEquals($user->getName(), 'admin6', 'Incorrect name');
        $this->assertEquals($user->getEmail(), 'admin6@mail.com', 'Incorrect email');
        $this->assertEquals($user->getPassword(), 'password6', 'Incorrect password');
    }
}

class UserManagerTest extends PHPUnit_Framework_TestCase { // Название класса лучше именовать как ТестируемыйКлассTest
    private $_userManager;
    
    // Функция вызываеться до начала теста
    public function setUp() {
        $this->_userManager = new UserManager();
    }
    
    // Функция вызываеться после окончания теста
    public function tearDown() { }
    
    // Тестируем функцию addUser
    public function testAddUser() {
        // Ожидаем исключение при размере пароля меньше 5 символов
        $this->setExpectedException('UserException'); // Тип исключения должен быть отличным от стандартного Exception, поэтому мы используем UserException
        $this->_userManager->addUser('admin1', 'admin1@mail.com', 'pass');
        
        // Правильно добавляем пользователя
        $this->_userManager->addUser('admin2', 'admin2@mail.com', 'password2');
        
        // Ожидаем исключение, так как такой пользователь уже существует
        $this->setExpectedException('UserException');
        $this->_userManager->addUser('admin2', 'admin2@mail.com', 'password2');
    }
    
    // Тестируем функцию getUser
    public function testGetUser() { // Название функции testИмяФункции, без аргументов
        $this->_userManager->addUser('admin3', 'admin3@mail.com', 'password3');
        $user = $this->_userManager->getUser('admin3');
        $this->assertNotNull($user);
        
        // Ожидаем исключение, так как такой пользователь не существует
        $this->setExpectedException('UserException');
        $this->_userManager->getUser('user');
    }
    
    // Тестируем функцию deleteUser
    public function testDeleteUser() {
        $this->_userManager->addUser('admin4', 'admin4@mail.com', 'password4');
        $this->_userManager->deleteUser('admin4');
        
        // Ожидаем исключение, так как такой пользователь не существует
        $this->setExpectedException('UserException');
        $this->_userManager->getUser('admin4');
    }
}

// Мы выполним сразу 2 теста из одного файла
// Переопределяем стандартный метод, собирающий информацию о тесте
if (!defined('PHPUnit_MAIN_METHOD')) {
    define('PHPUnit_MAIN_METHOD', 'AppTests::main');
}

class AppTests {
    public static function main() {
        PHPUnit_TextUI_TestRunner::run(self::suite());
    }
    
    public static function suite() {
        $ts = new PHPUnit_Framework_TestSuite('User Classes');
        $ts->addTestSuite('UserTest');
        $ts->addTestSuite('UserManagerTest');
        return $ts;
    }
}

// Если мы ранее переопределили стандартный метод, собирающий информацию о тесте, запускаем его
// Такая конструкция требуется для последующей маштабируемости
if(PHPUnit_MAIN_METHOD == 'AppTest::main') {
    AppTest::main();
}
?>