interface EmailTemplateProps {
  name: string;
  email: string;
  company?: string;
  telephone?: string;
  message: string;
}

export function EmailTemplate({ name, email, company, telephone, message }: EmailTemplateProps) {
  return (
    <div>
      <h1>Website contact form submission</h1>

      <p>
        <strong>Name:</strong> {name}
      </p>

      <p>
        <strong>Email:</strong> {email}
      </p>

      <p>
        <strong>Company:</strong> {company || "—"}
      </p>

      <p>
        <strong>Telephone:</strong> {telephone || "—"}
      </p>

      <p>
        <strong>Message:</strong>
        <br />
        {message}
      </p>
    </div>
  );
}
