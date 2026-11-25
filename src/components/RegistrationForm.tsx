import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registrationSchema,
  RegistrationFormValues,
} from "../schemas/registrationSchema";

const SKILL_OPTIONS = ["HTML", "CSS", "JavaScript", "React"];

export const RegistrationForm: React.FC = () => {
  const [submittedData, setSubmittedData] =
    useState<RegistrationFormValues | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
    defaultValues: {
      namaLengkap: "",
      nis: "",
      divisi: undefined,
      keahlian: [],
      setujuTataTertib: false,
    },
  });

  const onSubmit = (data: RegistrationFormValues) => {
    setSubmittedData(data);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-md border border-gray-100 p-6">
      <h1 className="text-xl font-bold text-center text-gray-800 mb-6">
        Pendaftaran Divisi IT Santri (React + TypeScript)
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Nama Lengkap
          </label>
          <input
            type="text"
            placeholder="Masukkan nama santri"
            {...register("namaLengkap")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.namaLengkap && (
            <p className="text-xs text-red-500 mt-1">
              {errors.namaLengkap.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            NIS
          </label>
          <input
            type="number"
            placeholder="Contoh: 11024"
            {...register("nis")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.nis && (
            <p className="text-xs text-red-500 mt-1">{errors.nis.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Umur
          </label>
          <input
            type="number"
            placeholder="Contoh: 16"
            {...register("umur", { valueAsNumber: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.umur && (
            <p className="text-xs text-red-500 mt-1">{errors.umur.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Pilihan Divisi
          </label>
          <select
            defaultValue=""
            {...register("divisi")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              -- Pilih Divisi --
            </option>
            <option value="Frontend">Frontend Engineering</option>
            <option value="Backend">Backend Engineering</option>
            <option value="UI/UX">UI/UX Design</option>
          </select>
          {errors.divisi && (
            <p className="text-xs text-red-500 mt-1">{errors.divisi.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Keahlian yang Dikuasai
          </label>
          <div className="grid grid-cols-2 gap-2">
            {SKILL_OPTIONS.map((skill) => (
              <label
                key={skill}
                className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={skill}
                  {...register("keahlian")}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span>{skill}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="pt-1">
          <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              {...register("setujuTataTertib")}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Saya menyetujui tata tertib divisi IT</span>
          </label>
          {errors.setujuTataTertib && (
            <p className="text-xs text-red-500 mt-1">
              {errors.setujuTataTertib.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className={`w-full py-2.5 px-4 rounded-md text-white font-medium text-sm transition-colors ${
            isValid
              ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
              : "bg-blue-300 cursor-not-allowed"
          }`}
        >
          Kirim Pendaftaran
        </button>
      </form>

      {submittedData && (
        <div className="mt-5 p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-900">
          <p className="font-bold text-emerald-800 flex items-center gap-1.5 mb-1">
            <span>✅</span> Pendaftaran Berhasil:
          </p>
          <p>Nama: {submittedData.namaLengkap}</p>
          <p>NIS: {submittedData.nis}</p>
          <p>Divisi: {submittedData.divisi}</p>
          <p>
            Keahlian:{" "}
            {submittedData.keahlian && submittedData.keahlian.length > 0
              ? submittedData.keahlian.join(", ")
              : "-"}
          </p>
        </div>
      )}
    </div>
  );
};