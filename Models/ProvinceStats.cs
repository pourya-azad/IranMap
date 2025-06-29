using System.ComponentModel.DataAnnotations;

namespace map_3.Models
{
    public class ProvinceStats
    {
        [Key]
        public int ProvinceCode { get; set; }
        public int Population { get; set; }
        public double UnemploymentRate { get; set; }
        public decimal GDP { get; set; }
    }

}
