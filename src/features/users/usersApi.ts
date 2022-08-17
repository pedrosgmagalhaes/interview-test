import API from "../../utils/services/api"

export async function fetchUsers(amount: number) {
  try {
    const getUsers = await API.get(`?inc=name,email,phone,picture,location&results=${amount}`)
      .catch((err) => {
        console.error("Error: " + err)
      })
    return await getUsers?.data?.results;
  } catch (e) {
    throw e;
  }
}