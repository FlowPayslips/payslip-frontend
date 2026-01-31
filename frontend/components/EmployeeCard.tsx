type Employee = {
  employee_id: number;
  user: string;
  is_active: boolean;
  onboarding_status: string;
  role: string;
};

export default function EmployeeCard({ employee }: { employee: Employee }) {
  return (
    <div className="border rounded p-4 flex items-start justify-between">
      <div>
        <div className="font-medium">{employee.user}</div>
        <div className="text-sm text-gray-600">
          ID: {employee.employee_id}
        </div>
        <div className="text-sm text-gray-600">
          Role: {employee.role}
        </div>
      </div>

      <div className="flex items-center gap-1 text-xs">
        <span
          className={`inline-block h-2 w-2 rounded-full ${
            employee.onboarding_status == "onboarded" ? "bg-green-500" : "bg-gray-400"
          }`}
        />
        <span className="text-gray-600">
          {employee.onboarding_status == "onboarded" ? "Active" : "Invited"}
        </span>
      </div>
    </div>
  );
}
