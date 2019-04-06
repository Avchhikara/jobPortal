import React from "react";
import FAreaItem from "./FAreaItem";
import "./FArea.css";

import { Col } from "reactstrap";

const fdata = {
  functionalarea: [
    {
      name: "Software Engineer",
      icon: "monitor",
      subCategory: [
        {
          name: "Mobile Developer"
        },
        {
          name: "Frontend Developer"
        },
        {
          name: "Backend Developer"
        },
        {
          name: "Full-Stack Developer"
        },
        {
          name: "Engineering Manager"
        },
        {
          name: "QA Engineer"
        },
        {
          name: "DevOps"
        },
        {
          name: "Software Architect"
        }
      ]
    },
    {
      name: "Designer",
      icon: "image",
      subCategory: [
        {
          name: "UI/UX Designer"
        },
        {
          name: "User Researcher"
        },
        {
          name: "Visual Designer"
        },
        {
          name: "Creative Director"
        }
      ]
    },
    {
      name: "Operations",
      icon: "sliders",
      subCategory: [
        {
          name: "Finance/Accounting"
        },
        {
          name: "HR"
        },
        {
          name: "Office Manager"
        },
        {
          name: "Recruiter"
        },
        {
          name: "Customer Service"
        },
        {
          name: "Operations Manager"
        }
      ]
    },
    {
      name: "Sales",
      icon: "dollar-sign",
      subCategory: [
        {
          name: "Business Development"
        },
        {
          name: "Key Account Manager"
        },
        {
          name: "Corporate Sales "
        },
        {
          name: "Institutional Sales"
        },
        {
          name: "Channel Sales "
        }
      ]
    },
    {
      name: "Marketing",
      icon: "dollar-sign",
      subCategory: [
        {
          name: "Digital Mkt/Online Mkt"
        },
        {
          name: "Marketing Analyst "
        }
      ]
    },
    {
      name: "Management",
      icon: "settings",
      subCategory: [
        {
          name: "CEO"
        },
        {
          name: "CFO"
        },
        {
          name: "CMO"
        },
        {
          name: "COO"
        },
        {
          name: "CTO"
        }
      ]
    },
    {
      name: "Other Engineering",
      icon: "globe",
      subCategory: [
        {
          name: "Hardware Engineer"
        },
        {
          name: "Mechanical Engineer"
        },
        {
          name: "System Engineer"
        }
      ]
    },
    {
      name: "Other",
      icon: "globe",
      subCategory: [
        {
          name: "Attorney"
        },
        {
          name: "Business Analyst"
        },
        {
          name: "Data Scientist"
        },
        {
          name: "Product Manager"
        },
        {
          name: "Project Maneger"
        }
      ]
    },
    {
      name: "School Jobs",
      icon: "book",
      subCategory: [
        {
          name: "Counselor"
        },
        {
          name: "Librarian"
        },
        {
          name: "Teacher/Private tutor"
        },
        {
          name: "Special Education Teacher"
        },
        {
          name: "Translator"
        },
        {
          name: "Transcriptionist"
        },
        {
          name: "Junior/Primary/Assistant Teacher"
        },
        {
          name: "Class Teacher/ Classroom coordinator"
        },
        {
          name: "Head Teacher / Head Mistress /Head Master"
        },
        {
          name: "Nursery Teacher"
        },
        {
          name: "School Teacher"
        },
        {
          name: "Vice Principal"
        },
        {
          name: "Principal"
        },
        {
          name: "Curriculam Designer"
        },
        {
          name: "Lab Assistant"
        },
        {
          name: "Warden"
        },
        {
          name: "Trainer"
        },
        {
          name: "Soft Skill Teacher"
        },
        {
          name: "Technical/ Process Trainer"
        },
        {
          name: "Daycare Teacher / incharge / Attendent"
        },
        {
          name: "Social Science Teacher"
        }
      ]
    },
    {
      name: "Language Teacher(TGT/PGT)",
      icon: "book-open",
      subCategory: [
        {
          name: "English Teacher"
        },
        {
          name: "French Teacher"
        },
        {
          name: "German Teacher"
        },
        {
          name: "Hindi Teacher"
        },
        {
          name: "Sanskrit Teacher"
        },
        {
          name: "Spanish Teacher"
        },
        {
          name: "Tamil Teacher"
        },
        {
          name: "Japanese Teacher"
        }
      ]
    },
    {
      name: "Academic Jobs",
      icon: "book",
      subCategory: [
        {
          name: " Subject Matter Expert"
        },
        {
          name: "Curriculum Developer"
        },
        {
          name: "Content Writer"
        },
        {
          name: "Copy Editor / Proof Reader / Editor"
        },
        {
          name: "Teacher Trainer / Academic Consultant "
        },
        {
          name: "Program Management"
        },
        {
          name: "Product Management"
        },
        {
          name: "Product Development"
        },
        {
          name: "Instructional designer"
        },
        {
          name: "Development Editor / Managing Editor"
        },
        {
          name: "Content Head / Subject Lead "
        },
        {
          name: "Special Teacher"
        }
      ]
    },
    {
      name: "Gaming ",
      icon: "aperture",
      subCategory: [
        {
          name: "Game Designer "
        },
        {
          name: "Game Artist "
        },
        {
          name: "Game Development "
        },
        {
          name: "Game Graphic "
        }
      ]
    },
    {
      name: "Data Scientist",
      icon: "database",
      subCategory: [
        {
          name: "Big data"
        },
        {
          name: "Senior data scientist"
        },
        {
          name: "Quantitative analyst"
        },
        {
          name: "Machine learning"
        }
      ]
    },
    {
      name: "Finance and Accounts",
      icon: "dollar-sign",
      subCategory: [
        {
          name: "Collection Manager"
        }
      ]
    }
  ]
};

class FunctionalArea extends React.Component {
  render() {
    // console.log()
    return (
      <Col xs={12} md={3} className="hide-on-small-and-med">
        <div className="functional-area-container">
          <h6>Functional Area</h6>
          {fdata.functionalarea.map((farea, i) => {
            return (
              <FAreaItem name={farea.name} key={i} sub={farea.subCategory} />
            );
          })}
        </div>
      </Col>
    );
  }
}

export default FunctionalArea;
