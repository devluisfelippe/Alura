import Evento from '../models/evento.js';
import unleash from '../services/unleash.js';

class EventosController {
  static liberaAcessoEventos = () => unleash.isEnabled('eventos');

  static listarEventos = async (req, res) => {
    if (this.liberaAcessoEventos()) {
      try {
        const resultado = await Evento.pegarEventos();
        res.status(200).json(resultado);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    } else {
      res.status(404).send();
    }
  };
}

export default EventosController;
