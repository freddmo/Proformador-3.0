namespace SistemaDeProforma.AplicacionWeb.Models.ViewModels
{
    public class VMAnalisis
    {
        //posiblemente s eleiminara la vista pero igual solo por si acaso

        public int TotalProformas { get; set; }
        public string? TotalIngresos { get; set; }
        public int? TotalProductos { get; set; }
        public int? TotalHospitales { get; set; }

        public List<VMProformasSemana> VentasUltimaSemana { get; set; }
        public List<VMHospitalesSemana> HospitalesTopUltimaSemana { get; set; }
    }
}
