import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(req: Request) {
  try {

    const { idea, images } = await req.json()

    const genAI = new GoogleGenerativeAI("AIzaSyAudaNSSmYAIcmlYGakUQM4YhtkpVk2Pko")

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-image"
    })
    console.log("Key : " , process.env.GEMINI_API_KEY)

    const parts: any[] = []

    // Main prompt
    parts.push({
      text: `
Generate an image based on the user's request.

User prompt:
${idea}

using the given image
`
    })

    // Attach reference images
    if (Array.isArray(images)) {
      images.forEach((img: string) => {
        parts.push({
          inlineData: {
            mimeType: "image/png",
            data: img
          }
        })
      })
    }

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts
        }
      ]
    })

    const response = result.response

    const partsResponse =
      response.candidates?.[0]?.content?.parts ?? []

    const imagePart = partsResponse.find(
      (p: any) => p.inlineData?.data
    )

    if (!imagePart || !imagePart.inlineData) {
      throw new Error("Gemini did not return an image")
    }

    const imageBase64 = imagePart.inlineData.data
    const mimeType = imagePart.inlineData.mimeType

    return Response.json({
      image: `data:${mimeType};base64,${imageBase64}`
    })

  } catch (error) {

    console.error("IMAGE GENERATION ERROR:", error)

    return Response.json(
      { error: "Image generation failed" },
      { status: 500 }
    )

  }
}