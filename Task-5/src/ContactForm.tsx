import { useForm } from "react-hook-form";
import "./ContactForm.css"; // For styling (create it)

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    alert("Thank you! Your message has been sent.");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
      <h2>Contact Us</h2>

      {/* Name */}
      <label>Name</label>
      <input
        {...register("name", { required: "Name is required" })}
        placeholder="Your name"
      />
      {errors.name && <p className="error">{errors.name.message}</p>}

      {/* Email */}
      <label>Email</label>
      <input
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Invalid email format",
          },
        })}
        placeholder="Your email"
      />
      {errors.email && <p className="error">{errors.email.message}</p>}

      {/* Message */}
      <label>Message</label>
      <textarea
        {...register("message", { required: "Message is required" })}
        placeholder="Your message"
      />
      {errors.message && <p className="error">{errors.message.message}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
