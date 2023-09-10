namespace SistemaDeProforma.AplicacionWeb.Models.ViewModels
{
    public class VMreporteProforma
    {
        public string? FechaRegistro { get; set; }
        public string? NumeroProforma { get; set; }
        public string? TipoProforma { get; set; }
        public string? CodigoInfima { get; set; }
        public string? RazonSocial { get; set; }
        public string? TotalGMC { get; set; }
        public string? TotalIMSUMED { get; set; }
        public string? TotalGERMEDIC { get; set; }
        public string? Producto { get; set; }
        public int? Cantidad { get; set; }
        public string? PrecioGMC { get; set; }
        public string? PrecioIMSUMED { get; set; }
        public string? PrecioGERMEDIC { get; set; }
        public string? TotalUnitarioGMC { get; set; }
        public string? TotalUnitarioIMS { get; set; }
        public string? TotalUnitarioGER { get; set; }
    }
}
