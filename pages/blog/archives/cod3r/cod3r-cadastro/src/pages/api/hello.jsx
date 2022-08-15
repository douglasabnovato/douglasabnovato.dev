
export default function handler(req, res) {
  res.status(200).json({ 
    name: 'Douglas Novato',
    method: req.method,
  })
}
