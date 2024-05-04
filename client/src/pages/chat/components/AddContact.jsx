

const AddContact = ({ contact }) => {
  return (
    <div className="flex gap-4 items-center cursor-pointer">
      <img className="h-12 w-12 rounded-full" src={contact.image.url} alt="" />
      <h1 className="text-lg">{contact.fullname}</h1>
    </div>
  );
};

export default AddContact;
