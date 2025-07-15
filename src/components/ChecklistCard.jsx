import "./ChecklistCard.css";

const ChecklistCard = ({ name, onClick, onDelete }) => {
  return (
    <div className="checklist-card">
      <h3 onClick={onClick} className="checklist-title">
        {name}
      </h3>
      <button className="delete-btn" onClick={onDelete}>
        Hapus
      </button>
    </div>
  );
};

export default ChecklistCard;
