using ConsumoApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace ConsumoApi.Controllers
{
    [Route("api/calculator")]
    [ApiController]
    public class CalculatorController : ControllerBase
    {
        [HttpPost]
        public IActionResult Calculate([FromBody] CalculatorRequest request)
        {
            if (request.Meters <= 0)
            {
                return BadRequest("A quantidade de metros deve ser maior que 0.");
            }

            var calculator = new Models.Calculator(request.Meters);
            var price = calculator.CalculatePrice();

            return Ok(new
            {
                request.Meters,
                price
            });
        }
    }
}
