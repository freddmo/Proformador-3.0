using SistemaDeProforma.Entity;

namespace SistemaDeProforma.AplicacionWeb.Models.ViewModels
{
    public class VMDetalleProductoProforma
    {
       
        public int? IdProducto { get; set; }

        public string? Cpc { get; set; }
        public string? Cum { get; set; }

        public string? Medicamento { get; set; }

        public string? Ff { get; set; }

        public string? Concentracion { get; set; }

        public string? Presentacion { get; set; }

        public string? Dc { get; set; }

        public string? Fc { get; set; }

        public string? Iva { get; set; }

        public int? Cantidad { get; set; }

        public string? PrecioGmc { get; set; }

        public string? PrecioIms { get; set; }

        public string? PrecioGer { get; set; }

        public string? TotalUgmc { get; set; }

        public string? TotalUims { get; set; }

        public string? TotalUger { get; set; }

       
    }
}
