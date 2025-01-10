import React, { useEffect, useState } from "react";

export default function Dropdown({
    label,
    name,
    value,
    onChange,
    fetchOptions,
    required = false,
    transformOption = (option) => option
}) {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadOptions = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchOptions();
                setOptions(data);
            } catch (err) {
                setError("Failed to load options.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadOptions();
    }, [fetchOptions]);

    return (
        <div>
            <label>
                {label}
                {required && <span style={{ color: "red" }}>*</span>}
            </label>
            {loading ? (
                <p>Loading options...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : (
                <select
                    name={name}
                    value={value || ""}
                    onChange={onChange}
                    required={required}
                >
                    <option value="" disabled>
                        Select {label.toLowerCase()}
                    </option>
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {transformOption(option)}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
}
