using System.ComponentModel.DataAnnotations;

namespace ConsumoApi.Models
{
    public class CalculatorRequest
    {
        [Range(1, int.MaxValue, ErrorMessage = "A quantidade de metros deve ser maior que 0.")]
        public int Meters { get; set; }
    }
}
