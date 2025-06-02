namespace ConsumoApi.Models
{
    public class Calculator
    {
        private readonly int totalMeters;
        private readonly List<Fare> fareBrackets;

        public Calculator(int totalMeters)
        {
            if (totalMeters <= 0)
                throw new ArgumentException("A quantidade de metros deve ser maior que zero.", nameof(totalMeters));
            this.totalMeters = totalMeters;
            fareBrackets =
            [
                new() { Limit = 10, Price = 2.0 },
                new() { Limit = 20, Price = 3.0 },
                new() { Limit = 30, Price = 5.0 },
                new() { Limit = int.MaxValue, Price = 8.0 }
            ];
        }

        public double CalculatePrice()
        {
            int remainingMeters = totalMeters;
            int calculatedMeters = 0;
            double totalPrice = 0.0;

            foreach (var fareBracket in fareBrackets)
            {
                if (remainingMeters <= 0)
                    break;

                int brackedLimit = fareBracket.Limit - calculatedMeters;
                var currentConsumption = Math.Min(remainingMeters, brackedLimit);

                totalPrice += currentConsumption * fareBracket.Price;
                remainingMeters -= currentConsumption;
                calculatedMeters += currentConsumption;
            }

            return totalPrice;
        }
    }
}
