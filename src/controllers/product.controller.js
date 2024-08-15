
export const getProductController = async (request, response) => {
    response.status(200).json({
        status: "OK",
        message: "API TEST"
    })
}