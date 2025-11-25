import EmployeesData from "./EmployeesData";

async function getEmployees(page: number = 1, limit: number = 5) {
    const res = await fetch(`http://localhost:3000/api/employees?page=${page}&limit=${limit}`, { cache: "no-store" });
    console.log(res);
    if (!res.ok) {
        throw new Error('Failed to fetch employee');
    }
    return res.json();
}

async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

    const params = await searchParams
    const page = Number(params?.page ?? 1);
    const limit = Number(params?.limit ?? 5);
    const { data: employees, total } = await getEmployees(page, limit);
    const totalPages = Math.ceil(total / limit);


    return (
        <div>
            <EmployeesData employees={employees} page={page} totalPages={totalPages} limit={limit} />
        </div>
    )
}

export default Page
