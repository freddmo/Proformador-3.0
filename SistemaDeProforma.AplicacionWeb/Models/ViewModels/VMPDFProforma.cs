namespace SistemaDeProforma.AplicacionWeb.Models.ViewModels
{
    public class VMPDFProforma
    {
        public VMNegocio? negocio { get; set; }
        //public VMHospital? hospital { get; set; } se hizo el cambio el 29-07 cuando se buscaba hacer pdf
        public VMProforma? proforma { get; set; }
        
    }
}
