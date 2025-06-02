class WaterCalculator {
  constructor() {
    this.form = document.getElementById("waterForm")
    this.consumptionInput = document.getElementById("consumption")
    this.apiUrlInput = document.getElementById("apiUrl")
    this.calculateBtn = document.getElementById("calculateBtn")
    this.resultsDiv = document.getElementById("results")
    this.summaryDiv = document.getElementById("summary")
    this.breakdownDiv = document.getElementById("breakdown")
    this.errorDiv = document.getElementById("error")

    this.init()
  }

  init() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e))
    this.consumptionInput.addEventListener("input", () => this.clearError())
  }

  async handleSubmit(e) {
    e.preventDefault()

    const consumption = Number.parseFloat(this.consumptionInput.value)
    const apiUrl = "https://localhost:7140/api/calculator" // ALTERAR O HOST CASO NECESSÁRIO

    if (!this.validateInput(consumption)) {
      return
    }

    this.setLoading(true)
    this.clearError()
    this.hideResults()

    try {
      const result = await this.callAPI(apiUrl, consumption)
      this.displayResults(result, consumption)
    } catch (error) {
      this.showError(`Erro ao calcular a conta: ${error.message}`)
      console.error("Erro:", error)
    } finally {
      this.setLoading(false)
    }
  }

  validateInput(consumption) {
    if (isNaN(consumption) || consumption < 0) {
      this.showError("Por favor, insira um valor válido para o consumo.")
      return false
    }
    return true
  }

  async callAPI(apiUrl, consumption) {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ meters: consumption }),
      })

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      throw error
    }
  }

  displayResults(apiResponse) {
    this.displaySummary(apiResponse)
    this.showResults()
  }

  displaySummary(apiResponse) {
    this.summaryDiv.innerHTML = `
      <h3>Resumo da Conta</h3>
      <p><strong>Consumo Total:</strong> ${apiResponse.meters.toFixed(2)} m³</p>
      <div class="total-value">Total: R$ ${Number(apiResponse.price).toFixed(2)}</div>
    `
  }

  setLoading(isLoading) {
    const btnText = this.calculateBtn.querySelector(".btn-text")
    const loading = this.calculateBtn.querySelector(".loading")

    if (isLoading) {
      btnText.style.display = "none"
      loading.style.display = "inline"
      this.calculateBtn.disabled = true
    } else {
      btnText.style.display = "inline"
      loading.style.display = "none"
      this.calculateBtn.disabled = false
    }
  }

  showResults() {
    this.resultsDiv.style.display = "block"
    this.resultsDiv.scrollIntoView({ behavior: "smooth" })
  }

  hideResults() {
    this.resultsDiv.style.display = "none"
  }

  showError(message) {
    this.errorDiv.textContent = message
    this.errorDiv.style.display = "block"
  }

  clearError() {
    this.errorDiv.style.display = "none"
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new WaterCalculator()
})
