import { render, screen } from "@testing-library/react";
import UniversitySubjectDetails from "./UniversitySubjectDetails";
import { UNIVERSITY_SUBJECTS } from "../../data/universitySubjectsData";

// CRA's Jest 27 cannot resolve react-router v7 (exports-only package), so the
// two hooks this page uses are mocked instead of rendering a real router.
let mockSubjectId;
const mockNavigate = jest.fn();
jest.mock(
  "react-router-dom",
  () => ({
    useParams: () => ({ subjectId: mockSubjectId }),
    useNavigate: () => mockNavigate,
  }),
  { virtual: true },
);

const renderSubject = (subjectId) => {
  mockSubjectId = subjectId;
  return render(<UniversitySubjectDetails />);
};

beforeAll(() => {
  window.scrollTo = jest.fn();
});

// Every subject that used to link lecture files (70 links across 11 subjects).
const subjectsWithFiles = UNIVERSITY_SUBJECTS.filter((s) =>
  s.chapters.some((c) => c && typeof c === "object" && c.file),
);

test("the data still contains subjects whose chapters had lecture files", () => {
  expect(subjectsWithFiles.length).toBeGreaterThan(0);
});

test.each(subjectsWithFiles.map((s) => [s.id]))(
  "%s lists its chapters without View/Download links and shows the materials note",
  (subjectId) => {
    const subject = UNIVERSITY_SUBJECTS.find((s) => s.id === subjectId);
    const { container } = renderSubject(subjectId);

    expect(screen.getByRole("heading", { name: subject.title })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /view/i })).toBeNull();
    expect(screen.queryByRole("link", { name: /download/i })).toBeNull();
    expect(container.querySelector('a[href^="/university/"]')).toBeNull();

    expect(
      screen.getByText("Course materials are available to enrolled students."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("المواد الدراسية متاحة للطلبة المسجّلين في المادة."),
    ).toHaveAttribute("dir", "rtl");

    const firstObjectChapter = subject.chapters.find((c) => typeof c === "object");
    expect(screen.getAllByText(firstObjectChapter.title.trim()).length).toBeGreaterThan(0);
  },
);

test("subjects with plain-string chapters still render", () => {
  renderSubject("programming-1");
  expect(screen.getByText("Introduction to Programming")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Start Quiz" })).toBeInTheDocument();
});

test("an unknown subject shows the not-found state", () => {
  renderSubject("no-such-subject");
  expect(screen.getByText("Subject not found.")).toBeInTheDocument();
});
