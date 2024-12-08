package main

import (
	"bufio"
	"fmt"
	"io"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"
)

const monitorings = 3
const delay = 5

func main() {
	showIntroduction()
	for {
		showMenu()
		comando := readCommand()

		switch comando {
		case 1:
			startMonitoring()
		case 2:
			showLogs()
		case 0:
			fmt.Println("Exit system!")
			os.Exit(0) // 0 informa o sistema que sai do serviço com sucesso
		default:
			fmt.Println("I don't know your command!")
			os.Exit(-1) // -1 indica que ocorreu algo inesperado no programa
		}
	}
}

func showIntroduction() {
	nome := "Luis"
	versao := 1.21
	fmt.Println("Olá, sir.", nome)
	fmt.Println("Este programa esta na versão ->", versao)
}

func showMenu() {
	fmt.Println("1- Iniciar Monitoramento")
	fmt.Println("2- Exibir os Logs")
	fmt.Println("0- Sair do Programa")
}

func readCommand() int {
	var command int
	fmt.Scan(&command) // &d representa que é um inteiro, o 1 parametro é o modificador, o 2 espera o endereço da variavel, o & serve para indicar o local aonde esta o endereço da variavel
	return command
}

func startMonitoring() {
	fmt.Println("Start monitoring...")
	// sites := []string{"https://www.alura.com.br",
	// 	"https://httpbin.org/status/200", "https://www.caelum.com.br"}

	sites := readFileSites()

	for i := 0; i < monitorings; i++ {
		for i, site := range sites { //o range me permite acessar os valores do slice. Forma padrão do for(i := 0; i < len(sites); i++)
			fmt.Println("Indice", i)
			testSite(site)
		}
		time.Sleep(delay * time.Second)
		fmt.Println("")
	}
}

func testSite(site string) {
	resp, err := http.Get(site)

	if err != nil {
		fmt.Println("Ocorreu o seguinte erro:", err)
	}

	if resp.StatusCode == 200 {
		fmt.Println("Site:", site, "foi carregado com sucesso!")
		registerLog(site, true)
	} else {
		fmt.Println("Site:", site, "esta com problemas. Status Code", resp.StatusCode)
		registerLog(site, false)
	}
}

func readFileSites() []string {
	var sites []string

	file, err := os.Open("sites.txt")

	if err != nil {
		fmt.Println("Ocorreu um erro:", err)
	}

	leitor := bufio.NewReader(file)

	for {
		linha, err := leitor.ReadString('\n') // informo o byte da quebra de linha para saber até aonde ir
		linha = strings.TrimSpace(linha)

		sites = append(sites, linha)

		if err == io.EOF {
			break
		}
	}
	file.Close()

	return sites
}

func registerLog(site string, status bool) {
	file, err := os.OpenFile("logs.txt", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)

	if err != nil {
		fmt.Println("Erro ao abrir o arquivo::", err)
	}

	file.WriteString(time.Now().Format("02/01/2006 15:04:05") + " - " + site + " - online: " + strconv.FormatBool(status) + "\n")

	file.Close()
}

func showLogs() {
	fmt.Println("Showing logs...")

	file, err := os.ReadFile("logs.txt")

	if err != nil {
		fmt.Println("Erro ao exibir os logs::", err)
	}

	fmt.Println(string(file))

}
