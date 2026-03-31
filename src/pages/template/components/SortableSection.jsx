// src/pages/template/components/SortableSection.jsx
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

/**
 * SortableSection.jsx
 *
 * Component này đóng vai trò là "wrapper" cho mỗi section trong CV Editor.
 * Nó cho phép người dùng kéo thả để sắp xếp thứ tự các phần của CV.
 *
 * Sử dụng thư viện: @dnd-kit/sortable
 */

const SortableSection = ({ section, cvData, updateCvData }) => {
  /**
   * useSortable() trả về các thuộc tính và hàm cần thiết để làm tính năng kéo thả
   * - setNodeRef: Gắn ref vào phần tử DOM để thư viện theo dõi
   * - attributes: Các thuộc tính hỗ trợ accessibility (ARIA)
   * - listeners: Các event listener cho việc kéo (mouse, touch, keyboard)
   * - transform & transition: Dùng để tạo hiệu ứng di chuyển mượt mà
   */
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: section.id });

  /**
   * Tạo style động cho phần tử khi đang kéo thả
   * CSS.Transform.toString() chuyển đổi giá trị transform từ @dnd-kit thành chuỗi CSS
   */
  const style = {
    transform: CSS.Transform.toString(transform),
    transition, // Hiệu ứng chuyển động mượt
  };

  // Lấy component tương ứng với section (PersonalSection, EducationSection, ...)
  const SectionComponent = section.component;

  return (
    <div
      ref={setNodeRef} // Gắn ref để @dnd-kit theo dõi phần tử này
      style={style} // Áp dụng transform và transition khi kéo
      className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm hover:shadow-md transition-all"
    >
      {/* ==================== Thanh tiêu đề + Icon kéo thả ==================== */}
      <div className="flex items-center gap-3 mb-5">
        {/* Icon kéo thả - Người dùng click và kéo vào đây để sắp xếp */}
        <div
          {...attributes} // Thuộc tính hỗ trợ accessibility
          {...listeners} // Các event listener cho kéo thả
          className="cursor-grab text-gray-400 hover:text-gray-600 text-2xl active:cursor-grabbing select-none"
        >
          ⋮⋮
        </div>

        {/* Tiêu đề của section */}
        <h3 className="font-semibold text-lg text-gray-800">{section.label}</h3>
      </div>

      {/* ==================== Nội dung form của section ==================== */}
      {/* 
        SectionComponent là component động (PersonalSection, EducationSection, ...)
        Chúng ta truyền cvData và updateCvData vào để section con có thể đọc và chỉnh sửa dữ liệu
      */}
      <SectionComponent cvData={cvData} updateCvData={updateCvData} />
    </div>
  );
};

export default SortableSection;
