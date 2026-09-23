"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { AnnouncementBar } from "./dashboard/AnnouncementBar";
import { DashboardHeader } from "./dashboard/DashboardHeader";
import { PublisherCard } from "./dashboard/PublisherCard";
import { TeachersTable } from "./dashboard/TeachersTable";
import { AddTeacherModal, type TeacherForm } from "./dashboard/AddTeacherModal";
import { ConfirmDialog } from "./dashboard/ConfirmDialog";
import { ToastStack, type Toast } from "./dashboard/ToastStack";
import { DashboardFooter } from "./dashboard/DashboardFooter";
import { readJson, readRaw, subscribe, writeJson, writeRaw } from "@/lib/localStore";

export type Teacher = {
  id: number;
  name: string;
  subject: string;
  link: string;
  cardsCount: number;
  active: boolean;
};

const STORAGE_TEACHERS = "anwan_admin_teachers";
const STORAGE_ANNOUNCEMENT = "anwan_global_announcement";

const DEFAULT_ANNOUNCEMENT =
  "تنبيه هام: انتظام المحاضرات في جميع المواعيد المحددة هذا الأسبوع بجميع المناهج الدراسية.";

const DEFAULT_TEACHERS: Teacher[] = [
  { id: 1, name: "أ. محمد عبد الله", subject: "الفيزياء", link: "/teachers/mohamed-abdullah", cardsCount: 142, active: true },
  { id: 2, name: "أ. أحمد سامي", subject: "الرياضيات", link: "/teachers/ahmed-sami", cardsCount: 98, active: true },
  { id: 3, name: "أ. محمود خالد", subject: "الكيمياء", link: "/teachers/mahmoud-khaled", cardsCount: 65, active: false },
  { id: 4, name: "د. سارة مصطفى", subject: "اللغة العربية", link: "/teachers/sara-mostafa", cardsCount: 210, active: true },
];

const EMPTY_FORM: TeacherForm = { name: "", subject: "", link: "" };

export function AdminDashboard() {
  // ── Persisted data: localStorage is the source of truth ──────────────
  const subscribeTeachers = useCallback((cb: () => void) => subscribe(STORAGE_TEACHERS, cb), []);
  const teachers = useSyncExternalStore(
    subscribeTeachers,
    useCallback(() => readJson<Teacher[]>(STORAGE_TEACHERS, DEFAULT_TEACHERS), []),
    useCallback(() => DEFAULT_TEACHERS, [])
  );

  const subscribeAnnouncement = useCallback(
    (cb: () => void) => subscribe(STORAGE_ANNOUNCEMENT, cb),
    []
  );
  const announcement = useSyncExternalStore(
    subscribeAnnouncement,
    useCallback(() => readRaw(STORAGE_ANNOUNCEMENT, DEFAULT_ANNOUNCEMENT), []),
    useCallback(() => DEFAULT_ANNOUNCEMENT, [])
  );

  // First visit: seed the demo data (matches the original behavior).
  useEffect(() => {
    if (window.localStorage.getItem(STORAGE_TEACHERS) === null) {
      writeJson(STORAGE_TEACHERS, DEFAULT_TEACHERS);
    }
  }, []);

  // ── UI state ─────────────────────────────────────────────────────────
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState<TeacherForm>(EMPTY_FORM);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [pendingDelete, setPendingDelete] = useState<number | null>(null);

  const pushToast = useCallback((type: Toast["type"], message: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  }, []);

  const persistTeachers = useCallback((next: Teacher[]) => {
    writeJson(STORAGE_TEACHERS, next);
  }, []);

  function publishAnnouncement(text: string): boolean {
    if (!text) {
      pushToast("error", "اكتب نص التنبيه أو الرسالة المراد نشرها الأول.");
      return false;
    }
    writeRaw(STORAGE_ANNOUNCEMENT, text);
    pushToast("success", "تم نشر الرسالة العامة — هتظهر فورًا في شريط الإعلانات.");
    return true;
  }

  function closeAddModal() {
    setAddOpen(false);
    setForm(EMPTY_FORM);
  }

  function saveNewTeacher() {
    const name = form.name.trim();
    const subject = form.subject.trim();
    const link = form.link.trim();

    if (!name || !subject || !link) {
      pushToast("error", "يجب ملء جميع الحقول (الاسم، المادة، الرابط) قبل الحفظ.");
      return;
    }

    persistTeachers([
      ...teachers,
      { id: Date.now(), name, subject, link, cardsCount: 0, active: true },
    ]);
    closeAddModal();
    pushToast("success", `تمت إضافة ${name} بنجاح إلى قائمة المدرسين.`);
  }

  function toggleTeacher(id: number) {
    persistTeachers(teachers.map((t) => (t.id === id ? { ...t, active: !t.active } : t)));
  }

  function confirmDelete() {
    const target = teachers.find((t) => t.id === pendingDelete);
    persistTeachers(teachers.filter((t) => t.id !== pendingDelete));
    setPendingDelete(null);
    if (target) pushToast("info", `تم حذف ${target.name} نهائيًا من المنصة.`);
  }

  return (
    <>
      <AnnouncementBar text={announcement} />
      <DashboardHeader />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <PublisherCard onPublish={publishAnnouncement} />
        <TeachersTable
          teachers={teachers}
          onAdd={() => setAddOpen(true)}
          onToggle={toggleTeacher}
          onDelete={(id) => setPendingDelete(id)}
        />
      </main>

      <DashboardFooter />

      {addOpen && (
        <AddTeacherModal
          form={form}
          onChange={setForm}
          onClose={closeAddModal}
          onSave={saveNewTeacher}
        />
      )}

      <ConfirmDialog
        open={pendingDelete !== null}
        teacherName={teachers.find((t) => t.id === pendingDelete)?.name ?? ""}
        onCancel={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
      />

      <ToastStack toasts={toasts} />
    </>
  );
}
