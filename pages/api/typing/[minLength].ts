import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch("https://api.quotable.io/random?minLength=" + req.query.minLength.toString());
    
    // Check if the response is ok and has JSON content type
    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ 
        error: `External API error (${response.status}): ${errorText}` 
      });
    }
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const responseText = await response.text();
      return res.status(500).json({ 
        error: `Expected JSON response but received: ${contentType}. Response: ${responseText}` 
      });
    }
    
    const data = await response.json();
    res.status(200).json({ quote: data.content, author: data.authorSlug });
    
  } catch (err) {
    res.status(500).json({ 
      error: err instanceof Error ? err.message : "Failed to fetch quote from external API" 
    });
  }
}