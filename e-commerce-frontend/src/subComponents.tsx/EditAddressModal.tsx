// Modal component for editing the address
import { useState,useEffect } from "react";

 const EditAddressModal = ({ isOpen, onClose, onSave, currentAddress }: { isOpen: boolean, onClose: () => void, onSave: (newAddress: string) => void, currentAddress: string }) => {
    const [newAddress, setNewAddress] = useState(currentAddress);
    console.log(currentAddress,"current addres",newAddress,"new address");

    useEffect(() => {
        setNewAddress(currentAddress);
    }, [currentAddress]);

    const handleSave = () => {
      if (newAddress.trim() !== '') {
        onSave(newAddress);
      }
    };
  
    return (
      isOpen ? (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-semibold mb-4">Edit Address</h3>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              rows={4}
            />
            <div className="flex gap-4 justify-end">
              <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-black rounded-lg">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Save</button>
            </div>
          </div>
        </div>
      ) : null
    );
  };

  export default EditAddressModal;
  