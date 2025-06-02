namespace ConsumoApi.Models
{
    public class Calculator
    {
        private readonly int meters;
        private readonly List<Fare> fares;

        public Calculator(int meters = 0)
        {
            this.meters = meters;
            fares =
            [
               new() { Limit = 10, Price = 2.0 },
               new() { Limit = 20, Price = 3.0 },
               new() { Limit = 30, Price = 5.0 },
               new() { Limit = int.MaxValue, Price = 8.0 }
            ];
        }

        public double CalculatePrice()
        {
            int remainingMeters = meters;
            int calculatedMeters = 0;
            double totalPrice = 0.0;

            foreach (var fare in fares)
            {
                if (remainingMeters <= 0)
                    break;

                var currentConsumption = Math.Min(remainingMeters, fare.Limit - calculatedMeters);

                totalPrice += currentConsumption * fare.Price;
                remainingMeters -= currentConsumption;
                calculatedMeters += currentConsumption;
            }

            return totalPrice;
        }
    }
}
