using System.Text;
using SistemaDeProforma.BLL.Interfaces;
using System.Security.Cryptography;

namespace SistemaDeProforma.BLL.Implementacion
{
    public class UtilidadeService : IUtilidadesService
    {
        public string GenerarClave()
        {
            string clave = Guid.NewGuid().ToString("N").Substring(0,6);
            return clave;
        }

        public string ConvertirSha256(string texto)
        {
            StringBuilder sb = new StringBuilder();

            using (SHA256 hash = SHA256Managed.Create())
            {
                Encoding enc = Encoding.UTF8;

                byte[] result = hash.ComputeHash(enc.GetBytes(texto));

                foreach(byte b in result)
                {
                    sb.Append(b.ToString("x2"));
                }
            }
            return sb.ToString();
        }

       
    }
}
