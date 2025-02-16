
function CustomerList({data}:{data:forUser[]}) {
  return (
    <table className="w-full border-collapse border border-gray-400 text-lg text-gray-700">
    <thead>
      <tr>
        <th className="border border-gray-400 p-5">Customer Name</th>
        <th className="border border-gray-400 p-5">Email</th>
        <th className="border border-gray-400 p-5">Contact No.</th>
      </tr>
    </thead>
    <tbody>
      {data?.map((d) => (
        <tr key={d.userID}>
          <td className="border border-gray-400 p-2">
            {d.name}
          </td>
          <td className="border border-gray-400 p-2">
            {d.email}
          </td>
          <td className="border border-gray-400 p-2">
            {d.contactNo}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  )
}

export default CustomerList
