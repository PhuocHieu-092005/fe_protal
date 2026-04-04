/**
 * Kiểm tra tính hợp lệ của dữ liệu CV
 * @param {string} title - Tên CV
 * @param {object} cvData - Dữ liệu CV
 * @returns {object} - { isValid: boolean, message: string }
 */
export const validateCVData = (title, cvData) => {
  // 1. Kiểm tra tên CV
  if (!title || title.trim() === "") {
    return {
      isValid: false,
      message: "Vui lòng nhập tên CV",
    };
  }

  const { personalInfo, objective, education, experience, skills } = cvData;

  // 2. Kiểm tra thông tin cá nhân
  if (!personalInfo.fullName || personalInfo.fullName.trim() === "") {
    return {
      isValid: false,
      message: "Vui lòng nhập Họ và tên đầy đủ",
    };
  }

  if (!personalInfo.title || personalInfo.title.trim() === "") {
    return {
      isValid: false,
      message: "Vui lòng nhập Chức danh nghề nghiệp",
    };
  }

  if (!personalInfo.email || personalInfo.email.trim() === "") {
    return {
      isValid: false,
      message: "Vui lòng nhập Email",
    };
  }

  // Kiểm tra định dạng email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(personalInfo.email)) {
    return {
      isValid: false,
      message: "Email không hợp lệ",
    };
  }

  if (!personalInfo.phone || personalInfo.phone.trim() === "") {
    return {
      isValid: false,
      message: "Vui lòng nhập Số điện thoại",
    };
  }

  // 3. Kiểm tra mục tiêu nghề nghiệp
  if (!objective || objective.trim() === "") {
    return {
      isValid: false,
      message: "Vui lòng nhập Mục tiêu nghề nghiệp",
    };
  }

  // 4. Kiểm tra học vấn
  if (!education || education.length === 0) {
    return {
      isValid: false,
      message: "Vui lòng điền thông tin Học vấn",
    };
  }

  const edu = education[0];
  if (!edu.school || edu.school.trim() === "") {
    return {
      isValid: false,
      message: "Vui lòng nhập Tên trường đại học / cao đẳng",
    };
  }

  if (!edu.major || edu.major.trim() === "") {
    return {
      isValid: false,
      message: "Vui lòng nhập Chuyên ngành",
    };
  }

  if (!edu.gpa || edu.gpa.trim() === "") {
    return {
      isValid: false,
      message: "Vui lòng nhập GPA",
    };
  }

  if (!edu.period || edu.period.trim() === "") {
    return {
      isValid: false,
      message: "Vui lòng nhập Năm học",
    };
  }

  // 5. Kiểm tra kinh nghiệm
  if (!experience || experience.length === 0) {
    return {
      isValid: false,
      message: "Vui lòng thêm ít nhất 1 kinh nghiệm làm việc",
    };
  }

  // Kiểm tra từng kinh nghiệm
  for (let i = 0; i < experience.length; i++) {
    const exp = experience[i];

    if (!exp.title || exp.title.trim() === "") {
      return {
        isValid: false,
        message: `Kinh nghiệm #${i + 1}: Vui lòng nhập Tiêu đề kinh nghiệm`,
      };
    }

    if (!exp.role || exp.role.trim() === "") {
      return {
        isValid: false,
        message: `Kinh nghiệm #${i + 1}: Vui lòng nhập Vị trí / Vai trò`,
      };
    }

    if (!exp.period || exp.period.trim() === "") {
      return {
        isValid: false,
        message: `Kinh nghiệm #${i + 1}: Vui lòng nhập Thời gian`,
      };
    }

    if (!exp.description || exp.description.trim() === "") {
      return {
        isValid: false,
        message: `Kinh nghiệm #${i + 1}: Vui lòng nhập Mô tả công việc`,
      };
    }
  }

  // 6. Kiểm tra kỹ năng
  const hasSkills =
    (skills.programming && skills.programming.length > 0) ||
    (skills.frameworks && skills.frameworks.length > 0) ||
    (skills.softSkills && skills.softSkills.length > 0);

  if (!hasSkills) {
    return {
      isValid: false,
      message: "Vui lòng thêm ít nhất 1 kỹ năng",
    };
  }

  // Tất cả kiểm tra đã hoàn tất
  return {
    isValid: true,
    message: "Tất cả thông tin đầy đủ",
  };
};
