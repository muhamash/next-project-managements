export default async function Home ()
{
  // const id = 1;
  // const status = "pending";   

const response = await fetch(`http://localhost:3000/api/tasks/get-tasks-admin-uses`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
});

if (!response.ok) {
  throw new Error(`HTTP error! Status: ${response.status}`);
}

const result = await response.json();
console.log(result);


  return (
    <div className="bg-green-700">
      hello world
   </div>
  );
}