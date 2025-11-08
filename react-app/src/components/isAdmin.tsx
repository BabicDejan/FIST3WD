function AdminPanel({isAdmin}:{isAdmin:boolean}) {

  return (
    <div>
      <h2>Kontrolna tabla</h2>
      {isAdmin && <h2>Dobrodosao, administrator</h2>}
    </div>
  );
}

export default AdminPanel;