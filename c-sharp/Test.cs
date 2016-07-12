// http://stackoverflow.com/questions/553143/compiling-executing-a-c-sharp-source-file-in-command-prompt
// C:\Windows\Microsoft.NET\Framework\v2.0.50727\csc.exe /t:exe /out:D:\www\c-sharp\Test.exe D:\www\c-sharp\Test.cs

using System;
namespace HelloWorld
{
    class Hello 
    {
        static void Main() // Консольное приложение C# должно содержать статический метод Main, в котором начинается и заканчивается управление.
        {
            Console.WriteLine("Hello World!");

            // Keep the console window open in debug mode.
            Console.WriteLine("Press any key to exit.");
            Console.ReadKey();
        }
    }
}