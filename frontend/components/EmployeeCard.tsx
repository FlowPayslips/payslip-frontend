type Employee = {
  employee_id: number;
  user: string;
};

export default function EmployeeCard({ employee }: { employee: Employee }) {
  return (
    <div className="border rounded p-4 ">
      <div className="font-medium">{employee.user}</div>
      <div className="text-sm text-gray-600">{employee.employee_id}</div>
    </div>
  );
}
