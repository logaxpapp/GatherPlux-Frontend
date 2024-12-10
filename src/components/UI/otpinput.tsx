import { useState, useRef, KeyboardEvent, ChangeEvent, FC } from "react";

import ButtonSmIcon from "./buttonSmIcon";

interface OTPInputProps {
  length: number;
  onChange: (otp: string[]) => void;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
  buttonText?: string;
  showSubmitButton?: boolean;
}

const OTPInput: FC<OTPInputProps> = ({ length, onChange, onSubmit, isLoading, buttonText = "verify", showSubmitButton = false }) => {
  // const [isLoading, setIsLoading] = useState(false)
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // setIsLoading(true)
    if (onSubmit) {
      onSubmit(event);
    }
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const form = event.currentTarget.closest("form");
    if (form) {
      form.requestSubmit(); // This will trigger the form's onSubmit event
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      onChange(newOtp);

      // Move to the next input if the current one is filled
      if (index < length - 1 && value !== "") {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      onChange(newOtp);

      // Move to the previous input if backspace is pressed
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === "Enter") {
      e.preventDefault();
      // If "Enter" key is pressed, submit the form
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const pastedData = e.clipboardData
      .getData("text")
      .slice(0, length)
      .split("");
    if (pastedData.length === length) {
      setOtp(pastedData);
      onChange(pastedData);
      pastedData.forEach((value, index) => {
        if (inputRefs.current[index]) {
          inputRefs.current[index]!.value = value;
        }
      });
      inputRefs.current[length - 1]?.focus();
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div
        className="flex justify-between gap-2 "
        onPaste={handlePaste}
      >
        {otp.map((digit, index) => (

          <input
            type="text"
            key={`${index}-input`}
            placeholder={''}
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => {
              if (el) inputRefs.current[index] = el;
            }}
            className="w-[46px] h-12 bg-[#29484B] text-center text-2xl border border-gray-300 rounded-md focus:outline-none"
          />

        ))}
      </div>
      {showSubmitButton && (
        <div className="flex justify-center mt-6">
          <ButtonSmIcon
            label={buttonText}
            disabled={isLoading}
            icon={false}
            className="text-white"
            onClick={handleButtonClick}
          />
        </div>
      )}
    </form>
  );
};

export default OTPInput;
