using SistemaDeProforma.Entity;

namespace SistemaDeProforma.AplicacionWeb.Models.ViewModels
{
    public class VMProforma
    {
        public int IdProforma { get; set; }

        public string? NumeroProforma { get; set; }

        public int? IdTipoProforma { get; set; }
        public string? TipoProforma { get; set; }

        public int? IdUsuario { get; set; }
        public string? Usuario { get; set; }

        public string? DetalleTipoEmpresa { get; set; }

        public string? RazonSocial { get; set; }
        public string? RucRS { get; set; }
        public string? DireccionRS { get; set; }
        public string? CantonRS { get; set; }


        public string? CodigoInfima { get; set; }

        public string? Cvp { get; set; }

        public string? Fpago { get; set; }

        public string? Gtecnica { get; set; }

        public string? Obervacion { get; set; }

        public string? EtiquetaGmc { get; set; }

        public string? EtiquetaIms { get; set; }

        public string? EtiquetaGer { get; set; }

        public string? TiempoEntregaGmc { get; set; }

        public string? TiempoEntregaIms { get; set; }

        public string? TiempoEntregaGer { get; set; }

        public string? SubtotalGmc { get; set; }

        public string? SubtotalIms { get; set; }

        public string? SubtotalGer { get; set; }

        public string? IvaTotalGMC { get; set; }
        public string? IvaTotalIMS { get; set; }
        public string? IvaTotalGER { get; set; }

        public string? TotalGmc { get; set; }   

        public string? TotalIms { get; set; }

        public string? TotalGer { get; set; }

        public string? FechaRegistro { get; set; }

        public virtual ICollection<VMDetalleProductoProforma> DetalleProductoProformas { get; set; }

    }
}
