import { useEffect, useState } from "react";
import {
  getAllChecklists,
  createChecklist,
  deleteChecklist,
} from "../api/checklist";
import ChecklistCard from "../components/ChecklistCard";
import { useNavigate } from "react-router-dom";
import "./Checklist.css";

const Checklist = () => {
  const [checklists, setChecklists] = useState([]);
  const [newChecklist, setNewChecklist] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await getAllChecklists();
      setChecklists(response.data);
    } catch {
      alert("Gagal memuat checklist");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async () => {
    if (!newChecklist.trim()) return;
    try {
      await createChecklist(newChecklist);
      setNewChecklist("");
      fetchData();
    } catch {
      alert("Gagal menambahkan checklist");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus checklist ini?")) return;
    try {
      await deleteChecklist(id);
      fetchData();
    } catch {
      alert("Gagal menghapus checklist");
    }
  };

  return (
    <div className="checklist-page">
      <h2>Checklist Saya</h2>

      <div className="checklist-input">
        <input
          type="text"
          placeholder="Tambah checklist baru..."
          value={newChecklist}
          onChange={(e) => setNewChecklist(e.target.value)}
        />
        <button onClick={handleCreate}>Tambah</button>
      </div>

      <div className="checklist-container">
        {checklists.length > 0 ? (
          checklists.map((item) => (
            <ChecklistCard
              key={item.id}
              name={item.name}
              onClick={() => navigate(`/checklist/${item.id}`)}
              onDelete={() => handleDelete(item.id)}
            />
          ))
        ) : (
          <p className="empty-text">Belum ada checklist, ayo buat!</p>
        )}
      </div>
    </div>
  );
};

export default Checklist;
