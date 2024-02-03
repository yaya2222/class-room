"use client"
export default function NewPage() {
  return (
    <section className="flex flex-col justify-center items-center text-center m-auto">
      <h1>Create new class</h1>
    <form className=" flex  flex-col space-y-6">
    <div>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name"></input>
    </div>
    <div>
      <label htmlFor="description">Description:</label>
      <input type="text" id="description"></input>
    </div>
    <div>
      <label htmlFor="topic">Topic:</label>
      <input type="text" id="topic"></input>
    </div>
    <div className="text-center">
        <button
          type="submit"
          // disabled={isPending}
          className="bg-sky-400 hover:bg-sky-600 px-10 py-2 rounded-lg text-white font-semibold disabled:bg-sky-200"
        >
          add class
          {/* {textButton} */}
        </button>
      </div>
    </form>
    <div>
      <label htmlFor="image">Image:</label>
      <input type="file" id="image" hidden></input>
    </div>
    </section>
  )
}
