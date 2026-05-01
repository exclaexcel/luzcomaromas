import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const K_CALENDARIO = "exclaCelebraCalendario";
const TIPOS_LEMBRETE = ["Envio de convite", "Reunião com fornecedor", "Pagamento", "Checagem final"];

function Calendario() {
  const [lembretes, setLembretes] = useState(() => {
    const salvo = localStorage.getItem(K_CALENDARIO);
    if (salvo) {
      try {
        return JSON.parse(salvo);
      } catch (e) {
        console.error("Erro ao carregar lembretes", e);
        return [];
      }
    }
    return [];
  });
  const [form, setForm] = useState({
    tipo: "Envio de convite",
    data: "",
    hora: "",
    titulo: "",
    descricao: "",
    fornecedor: "",
  });
  const [editandoId, setEditandoId] = useState(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    localStorage.setItem(K_CALENDARIO, JSON.stringify(lembretes));
  }, [lembretes]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  const limparForm = () => setForm({
    tipo: "Envio de convite",
    data: "",
    hora: "",
    titulo: "",
    descricao: "",
    fornecedor: "",
  });

  const validar = () => {
    if (!form.data || !form.titulo.trim()) {
      showToast("Data e título são obrigatórios");
      return false;
    }
    return true;
  };

  const salvar = () => {
    if (!validar()) return;

    if (editandoId) {
      setLembretes((prev) =>
        prev.map((l) => (l.id === editandoId ? { ...l, ...form } : l))
      );
      showToast("Lembrete atualizado");
      setEditandoId(null);
    } else {
      setLembretes((prev) => [
        ...prev,
        { id: Date.now(), ...form, concluido: false },
      ]);
      showToast("Lembrete adicionado");
    }

    limparForm();
  };

  const editar = (item) => {
    setForm({
      tipo: item.tipo,
      data: item.data,
      hora: item.hora,
      titulo: item.titulo,
      descricao: item.descricao,
      fornecedor: item.fornecedor,
    });
    setEditandoId(item.id);
  };

  const remover = (id) => {
    setLembretes((prev) => prev.filter((item) => item.id !== id));
    showToast("Lembrete removido");
  };

  const handleEventClick = (clickInfo) => {
    const lembreteId = clickInfo.event.id;
    const lembrete = lembretes.find((l) => l.id == lembreteId);
    if (lembrete) {
      editar(lembrete);
    }
  };

  const events = lembretes.map(lembrete => ({
    id: lembrete.id,
    title: lembrete.titulo,
    start: `${lembrete.data}${lembrete.hora ? `T${lembrete.hora}`: ''}`,
    allDay: !lembrete.hora,
    extendedProps: lembrete
  }));

  return (
    <div style={{ padding: 20 }}>
      {toast && (
        <div style={{ position: "fixed", top: 20, right: 20, backgroundColor: "#2F4F3E", color: "#FFF", padding: "10px 14px", borderRadius: 8, zIndex: 1000 }}>
          {toast}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "20px" }}>
        <div>
          <section style={{ backgroundColor: "#FFF8F2", border: "1px solid #DCCDBE", borderRadius: 12, padding: 18, marginBottom: 26 }}>
            <h2 style={{ marginTop: 0, marginBottom: 16, color: "#2F4F3E" }}>{editandoId ? "Editar lembrete" : "Novo lembrete"}</h2>

            <div style={{ display: "grid", gap: 12 }}>
              <label style={{ fontWeight: 600, color: "#2F4F3E" }}>
                Tipo
                <select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })} style={{ width: "100%", padding: 9, border: "1px solid #DCCDBE", borderRadius: 8, marginTop: 6 }}>
                  {TIPOS_LEMBRETE.map((tipo) => <option key={tipo} value={tipo}>{tipo}</option>)}
                </select>
              </label>

              <label style={{ fontWeight: 600, color: "#2F4F3E" }}>
                Data
                <input type="date" value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} style={{ width: "100%", padding: 9, border: "1px solid #DCCDBE", borderRadius: 8, marginTop: 6 }} />
              </label>

              <label style={{ fontWeight: 600, color: "#2F4F3E" }}>
                Hora
                <input type="time" value={form.hora} onChange={(e) => setForm({ ...form, hora: e.target.value })} style={{ width: "100%", padding: 9, border: "1px solid #DCCDBE", borderRadius: 8, marginTop: 6 }} />
              </label>

              <label style={{ fontWeight: 600, color: "#2F4F3E" }}>
                Título
                <input type="text" value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} placeholder="Ex: Enviar convites" style={{ width: "100%", padding: 9, border: "1px solid #DCCDBE", borderRadius: 8, marginTop: 6 }} />
              </label>

              <label style={{ fontWeight: 600, color: "#2F4F3E" }}>
                Fornecedor (opcional)
                <input type="text" value={form.fornecedor} onChange={(e) => setForm({ ...form, fornecedor: e.target.value })} placeholder="Ex: Cerimonialista" style={{ width: "100%", padding: 9, border: "1px solid #DCCDBE", borderRadius: 8, marginTop: 6 }} />
              </label>

              <label style={{ fontWeight: 600, color: "#2F4F3E" }}>
                Descrição
                <textarea value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} placeholder="Anotações adicionais" style={{ width: "100%", padding: 9, border: "1px solid #DCCDBE", borderRadius: 8, marginTop: 6, minHeight: 80 }} />
              </label>
            </div>

            <div style={{ marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button onClick={salvar} style={{ backgroundColor: "#2F4F3E", color: "#FFF", border: "none", borderRadius: 8, padding: "10px 16px", fontWeight: 700, cursor: "pointer" }}>
                {editandoId ? "Atualizar" : "Adicionar"} lembrete
              </button>
              {editandoId && (
                <button onClick={() => { setEditandoId(null); limparForm(); }} style={{ backgroundColor: "#F3E2D8", color: "#8A5A44", border: "1px solid #E8D3C7", borderRadius: 8, padding: "10px 16px", fontWeight: 700, cursor: "pointer" }}>
                  Cancelar
                </button>
              )}
               {editandoId && (
                <button onClick={() => remover(editandoId)} style={{ backgroundColor: "#F3C0C0", color: "#7A1F1F", border: "none", borderRadius: 8, padding: "10px 16px", fontWeight: 700, cursor: "pointer" }}>
                  Remover
                </button>
              )}
            </div>
          </section>
        </div>
        <div>
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={events}
            eventClick={handleEventClick}
            editable={true}
            droppable={true}
            locale="pt-br"
            buttonText={{
                today:    'hoje',
                month:    'mês',
                week:     'semana',
                day:      'dia',
                list:     'lista'
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Calendario;
