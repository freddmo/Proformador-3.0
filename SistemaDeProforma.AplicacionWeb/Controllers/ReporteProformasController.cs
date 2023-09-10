using Microsoft.AspNetCore.Mvc;

namespace SistemaDeProforma.AplicacionWeb.Controllers
{
    public class ReporteProformasController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
