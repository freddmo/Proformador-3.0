using SistemaDeProforma.BLL.Interfaces;
using SistemaDeProforma.DAL.Interfaces;
using SistemaDeProforma.Entity;


namespace SistemaDeProforma.BLL.Implementacion
{
    public class NegocioService : INegocioService
    {
        private readonly IGenericRepository<Negocio> _repositorio;
        private readonly IFireBaseService _fireBaseService;

        public NegocioService(IGenericRepository<Negocio> repositorio, IFireBaseService fireBaseService)
        {
            _repositorio = repositorio;
            _fireBaseService = fireBaseService;

        }
        public async Task<Negocio> Obtener()
        {
           
            try
            {


                Negocio negocio_encontrado = await _repositorio.Obtener(n => n.IdNegocio == 1);
                return negocio_encontrado;


            }
            catch
            {
                throw;
            }



        }
        public async Task<Negocio> GuardarCambios(Negocio entidad, Stream Logo = null, string NombreLogo = "")
        {
            try
            {
                Negocio negocio_encontrado = await _repositorio.Obtener(n => n.IdNegocio == 1);


                negocio_encontrado.NumeroDocumento = entidad.NumeroDocumento;
                negocio_encontrado.Nombre = entidad.Nombre;
                negocio_encontrado.Correo = entidad.Correo;
                negocio_encontrado.Direccion = entidad.Direccion;
                negocio_encontrado.Telefono = entidad.Telefono;
                negocio_encontrado.Ruc = entidad.Ruc;

                negocio_encontrado.NombreLogo = negocio_encontrado.NombreLogo == "" ? NombreLogo : negocio_encontrado.NombreLogo;

                if (Logo != null)
                {
                    string urlLogo = await _fireBaseService.SubirStorage(Logo, "carpeta_logo", negocio_encontrado.NombreLogo);
                    negocio_encontrado.UrlLogo = urlLogo;
                }

                await _repositorio.Editar(negocio_encontrado);

                return negocio_encontrado;


            }
            catch
            {
                throw;
            }
        }

        public async Task<Negocio> Conseguir()
        {
            try
            {


                Negocio ims_encontrada = await _repositorio.Conseguir(n => n.IdNegocio == 2);
                return ims_encontrada;


            }
            catch
            {
                throw;
            }
        }

        public async Task<Negocio> GCIMS(Negocio alma, Stream Logo = null, string NombreLogo = "")
        {
            try
            {
                Negocio ims_encontrada = await _repositorio.Conseguir(m => m.IdNegocio == 2);


                ims_encontrada.NumeroDocumento = alma.NumeroDocumento;
                ims_encontrada.Nombre = alma.Nombre;
                ims_encontrada.Correo = alma.Correo;
                ims_encontrada.Direccion = alma.Direccion;
                ims_encontrada.Telefono = alma.Telefono;
                ims_encontrada.Ruc = alma.Ruc;

                ims_encontrada.NombreLogo = ims_encontrada.NombreLogo == "" ? NombreLogo : ims_encontrada.NombreLogo;

                if (Logo != null)
                {
                    string urlLogo = await _fireBaseService.SubirStorage(Logo, "carpeta_logo", ims_encontrada.NombreLogo);
                    ims_encontrada.UrlLogo = urlLogo;
                }

                await _repositorio.Editar(ims_encontrada);

                return ims_encontrada;


            }
            catch
            {
                throw;
            }
        }

        public async Task<Negocio> Adquirir()
        {
            try
            {


                Negocio ger_encontrada = await _repositorio.Adquirir(o => o.IdNegocio == 3);
                return ger_encontrada;


            }
            catch
            {
                throw;
            }
        }

        public async Task<Negocio> GCGER(Negocio ente, Stream Logo = null, string NombreLogo = "")
        {
            try
            {
                Negocio ger_encontrada = await _repositorio.Adquirir(o => o.IdNegocio == 3);


                ger_encontrada.NumeroDocumento = ente.NumeroDocumento;
                ger_encontrada.Nombre = ente.Nombre;
                ger_encontrada.Correo = ente.Correo;
                ger_encontrada.Direccion = ente.Direccion;
                ger_encontrada.Telefono = ente.Telefono;
                ger_encontrada.Ruc = ente.Ruc;

                ger_encontrada.NombreLogo = ger_encontrada.NombreLogo == "" ? NombreLogo : ger_encontrada.NombreLogo;

                if (Logo != null)
                {
                    string urlLogo = await _fireBaseService.SubirStorage(Logo, "carpeta_logo", ger_encontrada.NombreLogo);
                    ger_encontrada.UrlLogo = urlLogo;
                }

                await _repositorio.Editar(ger_encontrada);

                return ger_encontrada;


            }
            catch
            {
                throw;
            }
        }
    }
}
