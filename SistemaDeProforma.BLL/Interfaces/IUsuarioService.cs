using SistemaDeProforma.Entity;


namespace SistemaDeProforma.BLL.Interfaces
{
    public interface IUsuarioService
    {
        Task<List<Usuario>> Lista();
        Task<Usuario> Crear(Usuario entidad, Stream Foto = null, string NombreFoto ="", string UrlPlantillaCorreo = "");
        Task<Usuario> Editar(Usuario entidad, Stream Foto = null, string NombreFoto = "");
        Task<bool> Eliminar(int IdUsuario);

        Task<Usuario> ObtenerPorCredenciales(string correo, string clave);

        Task<Usuario> ObtenerPorId(int IdUsuario);

        Task<bool> GuardarPerfil(Usuario entidad);

        Task<bool> CambiarCLave(int IdUsuario, string ClaveActual, string ClaveNueva);

        Task<bool> RestablecerClave(string Correo, string UrlPlantillaCorreo);
    }
}
