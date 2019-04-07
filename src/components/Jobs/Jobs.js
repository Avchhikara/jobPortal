import React from "react";
import JobsList from "./JobsList";
import "./Jobs.css";

import { Col, Pagination, PaginationLink, PaginationItem } from "reactstrap";

class Jobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: {
        end: 10
      },
      toggleList: true,
      search: false
    };
  }

  componentWillUpdate() {
    this.checkSearch();
  }

  componentWillMount() {
    let sstr = this.props.location.search;
    if (sstr.length !== 0) {
      this.setState({ search: true });
    }
  }

  componentDidMount() {
    let sstr = this.props.location.search;
    if (sstr.length === 0) {
      this.setState({ search: false });
    } else {
      this.setState({ search: true });

      this.checkSearch();
    }
    // console.log("called");
  }

  toggleList = n => {
    this.setState(prev => ({
      jobs: {
        end: n
      }
    }));
  };

  checkSearch = () => {
    let sstr = this.props.location.search;
    sstr = sstr.substring(1, sstr.length);

    if (sstr !== "") {
      //Now, making an sstr object
      const newSstr = {};
      sstr = sstr.split("&");

      for (let str of sstr) {
        str = str.split("=");
        newSstr[str[0]] = str[1] ? str[1].toLowerCase() : "";
      }

      //Now, first sorting according to rdf
      let sjobs = jobsRaw.jobs;
      if (newSstr["rdf"]) {
        sjobs = jobsRaw.jobs.filter(job => {
          return job.functional_area.toLowerCase().includes(newSstr["rdf"]);
        });
      }
      if (newSstr["location"] && newSstr["location"] !== "") {
        sjobs = sjobs.filter(job => {
          return job.job_location.toLowerCase().includes(newSstr["location"]);
        });
      }

      if (newSstr["salary"] && newSstr["salary"] !== "") {
        sjobs = sjobs.filter(job => {
          if (
            job.max_salary >=
              Math.floor(parseInt(newSstr["salary"]) / 100000) &&
            Math.floor(parseInt(newSstr["salary"]) / 100000) >= job.min_salary
          ) {
            return true;
          } else {
            return false;
          }
        });
      }

      if (newSstr["experience"] && newSstr["experience"] !== "") {
        sjobs = sjobs.filter(job => {
          if (
            parseInt(newSstr["experience"]) >= job.min_experience &&
            parseInt(newSstr["experience"]) <= job.max_experience
          ) {
            return true;
          }
          return false;
        });
      }
      // this.setState({ search: true });

      //Now, just rendering the jobs
      return sjobs;
    } else {
      //Setting search to false
      // this.setState({ search: false });

      return [];
    }
  };

  render() {
    // console.log(this.state.jobs.end);
    return (
      <Col xs={12} lg={9} className="jobs-container">
        {this.state.toggleList && !this.state.search
          ? jobsRaw.jobs.map((job, index) => {
              //   console.log(index);
              // console.log("called");
              if (
                index < this.state.jobs.end &&
                index >= this.state.jobs.end - 10
              ) {
                return <JobsList key={index} job={job} id={index} />;
              } else {
                return null;
              }
            })
          : ""}

        {this.checkSearch().length === 0 && this.state.search ? (
          <h4>No jobs are present according to your criteria</h4>
        ) : (
          ""
        )}

        {this.state.search ? (
          //This will render the respective searched list
          this.checkSearch().map((job, i) => {
            return <JobsList key={i} job={job} id={i} />;
          })
        ) : (
          <Pagination>
            <PaginationItem
              onClick={() => {
                if (this.state.jobs.end > 10) {
                  this.setState(prev => ({
                    jobs: { end: prev.jobs.end - 10 }
                  }));
                }
              }}
              disabled={this.state.jobs.end <= 10 ? true : false}
            >
              <PaginationLink previous />
            </PaginationItem>
            <PaginationItem
              active={parseInt(this.state.jobs.end / 10) === 1 ? true : false}
              onClick={() => this.toggleList(10)}
            >
              <PaginationLink>1</PaginationLink>
            </PaginationItem>
            <PaginationItem
              active={parseInt(this.state.jobs.end / 10) === 2 ? true : false}
              onClick={() => this.toggleList(20)}
            >
              <PaginationLink>2</PaginationLink>
            </PaginationItem>
            <PaginationItem
              active={parseInt(this.state.jobs.end / 10) === 3 ? true : false}
              onClick={() => this.toggleList(30)}
            >
              <PaginationLink>3</PaginationLink>
            </PaginationItem>
            <PaginationItem
              onClick={() => {
                if (this.state.jobs.end < 30) {
                  this.setState(prev => {
                    return {
                      jobs: {
                        end: prev.jobs.end + 10
                      }
                    };
                  });
                }
              }}
              disabled={this.state.jobs.end === 30 ? true : false}
            >
              <PaginationLink next />
            </PaginationItem>
          </Pagination>
        )}
      </Col>
    );
  }
}

export default Jobs;

const jobsRaw = {
  jobs: [
    {
      createdAt: 1552960976210,
      updatedAt: 1552960976210,
      id: 1,
      job_title: "Sr. Area Business Manager",
      functional_area: "Sales and Marketing",
      min_salary: 6.0,
      max_salary: 10.0,
      is_salary_negotiable: true,
      job_location: "Bangalore,Hyderabad,Chennai",
      job_description:
        "<p><br/></p><p>Roles and Responsibilities</p><p><br/></p><p>Business Development:</p><p><br/></p><p>1. School acquisition: Support and monitor ABMs/ BDMs for reaching out to prospective schools through various lead sources like references, channel etc., build a pipeline and sign them up</p><p><br/></p><p>2. School Retention and upgrade: Monitor the retention of all existing schools and upgrade the value of business within the portfolio.</p><p><br/></p><p>3. Channel Development- Identify, develop and manager channel partners who can generate new business or influence a sale.</p><p><br/></p><p>4. Collection: Collection of money due from schools on time.</p><div><br/></div><div>School relationship:<br/>1. Relationship: Manage relationships with key schools in the zone. Also, ensure all team members are building and strengthening relationships with their customers.<br/>2. Communication: Ensure periodic communication with the customers and sharing the progress of program implementation in the School<div><br/>Program implementation:<br/>1. Coordination: Plan and coordinate internally with operations, product specialists and product team to ensure complete and efficient implementation at the School on a day to day basis. In case of escalation from ABM, need to resolve the roadblocks internally for him/her.</div><div><br/>Service satisfaction<br/>1. Customer Satisfaction: Drive customer satisfaction for the managed schools by monitoring to ensure time high-quality product and service delivery.<br/>2. Proactive problem solving– Be transparent in sharing the feedback of the Schools and proactively resolve issues or queries of customers in a timely manner.</div><div><br/>Team Leadership<br/>1. Recruitment: Recruitment of business team members and business partners<br/>2. Training and coaching: Training/ coaching of the team members<br/>3. Planning and Monitoring: Planning and monitoring the priorities of the business team members and ensuring the calendar is followed.</div><div><br/>Reporting and Documentation<br/>1. Documentation: Complete all documentation regarding school sign up, collect advance<br/>amount as per company policy and engage the schools as per the need.<br/>2. Reporting: Keep all reporting formats, CRM, documentation etc. updated on the day-to-day basis.</div></div>",
      min_experience: 2.0,
      max_experience: 7.0,
      job_category: "Full time",
      remark: "",
      job: 10,
      organization: 2
    },
    {
      createdAt: 1552960976225,
      updatedAt: 1552960976225,
      id: 2,
      job_title: "Game Designer for Leading Education Company",
      functional_area: "IT",
      min_salary: 6.0,
      max_salary: 9.0,
      is_salary_negotiable: true,
      job_location: "Bangalore",
      job_description:
        "<p>We are looking for a professional Game Designer to design and develop games (Physical toys) and activities kits Aligned to Company Curriculum. The goal is to facilitate students in acquiring knowledge, skills, and competencies in an Effective and appealing manner through these games and activities. We are looking for someone who feels excited about:</p><p><br/>Working with subject matter experts and identifying target learning outcomes and desired learning experiences<br/>Creating engaging and effective educational games within set budgets</p><p>Reviewing the game design and development process and signing off printables designing layout, kitting and packaging for the game kits<br/></p>",
      min_experience: 1.0,
      max_experience: 4.0,
      job_category: "Full time",
      remark: "",
      job: 1,
      organization: 2
    },
    {
      createdAt: 1552960976243,
      updatedAt: 1552960976243,
      id: 3,
      job_title: "Principal International School Hyderabad",
      functional_area: "Principal",
      min_salary: 10.0,
      max_salary: 18.0,
      is_salary_negotiable: true,
      job_location: "Hyderabad",
      job_description:
        '<p style="font-size: 14px;"><b><b></b><b><b>Role: School Principal</b></b></b><br/><b><b></b><b><b>Organization: An Upcoming International School </b></b></b></p><p style="font-size: 14px;"><b><b></b><b><b>Place: Hyderabad - Madaniguda <br/></b><br/>This upcoming international school is established under an aegis of a leading chain of schools ,with a vision to provide high quality education to children within the city.Team consists of passionate dynamic professionals dedicated to improve student-learning outcomes and create deep impact in the sector. By using innovative pedagogy and technology driven solution,  aims to improve learning levels and prepare leaders of tomorrow. </b></b></p><p style="font-size: 14px;"><br/>Role Summary:  Schools is looking for a passionate and dynamic Principal for one of its schools. This is a critical role and the selected candidate will be responsible for running one of the Schools by driving entire academics and school operations with support from head office team. The role requires strong sense of ownership and mid-long term commitment; the candidate will be rewarded appropriately through performance linked incentives and a fantastic working atmosphere.<br/><br/>Below is the details of the responsibilities and qualification for the role of Principal at the School.<br/><br/>Primary Responsibilities:<br/><br/>1. Academics, Team Building and Parent Engagement:<br/>•    The Principal would be the instruction in-charge at the school and would be the primary person responsible for enhancement of learning level of students.<br/>•    Work closely with the academic team to implement curriculum and training programs.<br/>•    Take initiatives to ensure all-round development of students.<br/>•    Develop child friendly culture at the school to provide holistic education to children.<br/>•    Promote activity based learning<br/>•    Implementation and monitoring of third-party student learning programs.<br/>•    Ensure appropriate and timely lesson plan preparation and submission by teachers. Provide training and support to teachers if required.<br/>•    Maximum and efficient utilization of key resources of the school - library, computer, science lab etc.<br/>•    Team building and maintaining excellent culture and discipline at the school. Responsible for<br/>Teachers and staff recruitment and management.<br/>•    Maintain high retention rates.<br/>•    Ensure high teachers attendance and proper substitution planning.<br/>•    Planning of various events –Intra and Inter-school which promotes student learning and all- round development. E.g. annual day, various celebrations and cultural programs, competitions etc.<br/>•    Planning of annual school calendar, timetables etc.<br/>•    Safety of students is of highest priority and the Principal is expected to take all necessary measures.<br/>•    Plan and conduct regular PTMs and other parent engagement programs<br/>•    Training and professional development of teachers and staff through in-house designed and<br/>3rd party programs.<br/>•    Counselling students, teachers and parents<br/><br/><br/>2.    School Operations &amp; Administration:<br/>    Manage day to day functioning of the school<br/>    Responsible for timely fee collection with the help of support staff. SMS communication and reminder support to be provided by the HO.<br/>    Manage and monitor small expenses at the school. Ensure proper voucher preparation etc.<br/>Training to be provided by the HO team.<br/>    Weekly accounting audit will be performed by the HO team.<br/>    Ensure accurate and timely student data entry in ERP system. Training to be provided by the HO<br/><br/>3.    School Growth:<br/>    Responsible for enrollment growth. Marketing support will be provided by the HO.<br/>    Ensure minimal student attrition through strong academics and parent relationship<br/>    Give inputs to Business development team at HO for marketing initiatives and preparing various marketing collateral.<br/>    Drive teachers and staff to engage with the community through various activities<br/>    Train teachers and parent counsellors to handle parent enquiries<br/>    Ensure smooth new enrollment process<br/>Experience:<br/><br/>At least 2 years of experience in a leadership/supervisory (Principal, Vice Principal, Team Head etc.) role at schools or other educational institutions. Overall over 7 years of experience in schools/education.<br/></p>',
      min_experience: 7.0,
      max_experience: 18.0,
      job_category: "Full time",
      remark: "",
      job: 2,
      organization: 2
    },
    {
      createdAt: 1552960976259,
      updatedAt: 1552960976259,
      id: 4,
      job_title: "Curriculum Developer  English  Hyderabad",
      functional_area: "Curriculum Developer/Subject Matter Expert",
      min_salary: 4.0,
      max_salary: 8.0,
      is_salary_negotiable: true,
      job_location: "Hyderabad",
      job_description:
        '<h4 style="font-size: 18px;">JOB DESCRIPTION</h4><p style="font-size: 14px;"><b id="docs-internal-guid-9d7c7ce2-b00a-31d4-72e5-9ec27464dc7a"><b></b></b></p><p dir="ltr" style="font-size: 14px;text-align: justify;"><span style="font-size: 12pt;background-color: transparent;vertical-align: baseline;">Role: Curriculum Developer - English at a leading chain of School </span></p><p dir="ltr" style="font-size: 14px;"><span style="font-size: 12pt;background-color: transparent;vertical-align: baseline;">A Curriculum Developer will be responsible for the following:</span></p><ol style="font-size: 14px;"><li dir="ltr" style="font-size: 12pt;background-color: transparent;vertical-align: baseline;"><p dir="ltr"><span style="font-size: 12pt;background-color: transparent;vertical-align: baseline;">Designing daily lessons plans for teaching topics in their domain with effective activities and clear, accurate explanations</span></p></li><li dir="ltr" style="font-size: 12pt;background-color: transparent;vertical-align: baseline;"><p dir="ltr"><span style="font-size: 12pt;background-color: transparent;vertical-align: baseline;">Researching and writing grade appropriate technical content texts (i.e., textbook material) for given topics</span></p></li><li dir="ltr" style="font-size: 12pt;background-color: transparent;vertical-align: baseline;"><p dir="ltr"><span style="font-size: 12pt;background-color: transparent;vertical-align: baseline;">Creating application and assessment tasks for students to show mastery of the topic</span></p></li><li dir="ltr" style="font-size: 12pt;background-color: transparent;vertical-align: baseline;"><p dir="ltr"><span style="font-size: 12pt;background-color: transparent;vertical-align: baseline;">Designing and developing digital content for classroom and home-based use</span></p></li><li dir="ltr" style="font-size: 12pt;background-color: transparent;vertical-align: baseline;"><p dir="ltr"><span style="font-size: 12pt;background-color: transparent;vertical-align: baseline;">Participating in a rigorous peer review process to both give and receive/incorporate constructive feedback on teaching/learning materials with the goal of improving effectiveness and quality</span></p></li></ol><p style="font-size: 14px;"><br/></p><p dir="ltr" style="font-size: 14px;"><span style="font-size: 12pt;background-color: transparent;vertical-align: baseline;">The Curriculum Developer will work with the Academic Head, other content writers and Editors to improve the quality of learning programs and to ensure that all parts are completed on time. They will collaborate with the larger multi-disciplinary design team to review content and make product decisions.They would write grade-appropriate content for English. </span></p>',
      min_experience: 1.0,
      max_experience: 10.0,
      job_category: "Full time",
      remark: "",
      job: 3,
      organization: 2
    },
    {
      createdAt: 1552960976267,
      updatedAt: 1552960976267,
      id: 5,
      job_title: "Marketing Analyst",
      functional_area: "Sales and Marketing",
      min_salary: 7.0,
      max_salary: 15.0,
      is_salary_negotiable: true,
      job_location: "Gurgaon",
      job_description:
        '<p><b>Job Description </b></p><p>Currently, we are <span id="selectionBoundary_1510548406065_4117289020137491" class="rangySelectionBoundary">&#65279;</span>looking for Marketing Analyst for Leading Education Company. Its main vision is to transform K-12 learning by making it fun and personalized for every child and to prepare them for skills required.</p><p><br/></p><p><b>Roles and Responsibilities</b><br/></p><p>• Interpret data, analyze results using statistical techniques and provide ongoing reports.<br/>• Maintaining business dashboards/reports and reporting it to management.<br/>• Acquire data from primary or secondary data sources and maintain databases/data systems.<br/>• Work closely with management to prioritize business and information needs<br/><br/><b>Requirements</b></p><p><br/>• Engineering graduate from a tier 1 college - IITs, BITS, DCE or NSIT<br/>• At least 1 year of relevant experience<br/>• Strong analytical and algorithmic problem-solving skills<br/>• Strong knowledge of SQL, Excel, Dashboarding, Business reports.<br/>• Hands on experience in Adwords search marketing.<br/>• Knowledge of Python will be a plus.<br/>• E-commerce/ Startup experience preferred but not mandatory.<br/>• Familiarity with tools like Mixpanel, Looker, Google Analytics &amp; Redis will be a plus.<br/>• Good team player.<br/>• Work independently under minimal direction with strong work ethic.<br/></p><p><b>Job Location - Gurgaon</b></p><p>Need some information on your side.</p><p>1. Current CTC:-</p><p>2. Expected CTC:-</p><p>3. Notice Period:-</p><p>4. Ready to relocate to Gurgaon:-</p><p><br/></p><p><br/></p>',
      min_experience: 1.0,
      max_experience: 5.0,
      job_category: "Full time",
      remark: "",
      job: 4,
      organization: 2
    },
    {
      createdAt: 1552960976280,
      updatedAt: 1552960976280,
      id: 6,
      job_title: "Curriculum Designer English Mumbai",
      functional_area: "Curriculum Developer/Subject Matter Expert",
      min_salary: 4.0,
      max_salary: 7.0,
      is_salary_negotiable: true,
      job_location: "Mumbai",
      job_description:
        '<p><b id="docs-internal-guid-5e2c7cba-b3ee-acd8-ce44-18defc0caf34"></b></p><p dir="ltr"><span style="font-size: 12pt;color: #000000;background-color: transparent;vertical-align: baseline;">A Curriculum Designer will be responsible for the following: </span></p><ol><li dir="ltr" style="font-size: 12pt;color: #000000;background-color: transparent;vertical-align: baseline;"><p dir="ltr"><span style="font-size: 12pt;color: #000000;background-color: transparent;vertical-align: baseline;">Designing daily lessons plans for teaching topics in their domain with effective activities and clear, accurate explanations</span></p></li><li dir="ltr" style="font-size: 12pt;color: #000000;background-color: transparent;vertical-align: baseline;"><p dir="ltr"><span style="font-size: 12pt;color: #000000;background-color: transparent;vertical-align: baseline;">Researching and writing grade appropriate technical content texts (i.e., textbook material) for given topics</span></p></li><li dir="ltr" style="font-size: 12pt;color: #000000;background-color: transparent;vertical-align: baseline;"><p dir="ltr"><span style="font-size: 12pt;color: #000000;background-color: transparent;vertical-align: baseline;">Creating application and assessment tasks for students to show mastery of the topic</span></p></li><li dir="ltr" style="font-size: 12pt;color: #000000;background-color: transparent;vertical-align: baseline;"><p dir="ltr"><span style="font-size: 12pt;color: #000000;background-color: transparent;vertical-align: baseline;">Designing and developing digital content for classroom and home-based use</span></p></li><li dir="ltr" style="font-size: 12pt;color: #000000;background-color: transparent;vertical-align: baseline;"><p dir="ltr"><span style="font-size: 12pt;color: #000000;background-color: transparent;vertical-align: baseline;">Participating in a rigorous peer review process to both give and receive/incorporate constructive feedback on teaching/learning materials with the goal of improving effectiveness and quality</span></p></li></ol><p><br/></p>',
      min_experience: 3.0,
      max_experience: 9.0,
      job_category: "Full time",
      remark: "",
      job: 5,
      organization: 2
    },
    {
      createdAt: 1552960976417,
      updatedAt: 1552960976417,
      id: 12,
      job_title: "Pre Primary Teacher Hyderabad",
      functional_area: "Pre-primary Teacher",
      min_salary: 1.0,
      max_salary: 5.0,
      is_salary_negotiable: true,
      job_location: "Hyderabad",
      job_description:
        '<p><b>Job : Pre Primary Teacher </b></p><p><b>Location : Hyderabad </b></p><p><b>Organisation : International School </b></p><p><b><br/></b></p><p><b>Role and Responsbility : </b></p><p><br/></p><ol><li>Create a floor plan and the classroom layout of the allocated classroom.<br/></li><li>Plan and execute the classroom display and bulletin boards as per guidelines and checklist shared by the CO (Central Office) <br/></li><li>Set up the learning areas by adding or replacing teaching-learning resources and materials in each of the areas as per the checklist and guidelines shared. <br/></li><li>Coordinate and plan the Annual, monthly, weekly and daily curriculum plans and share via email and/or upload it on the server regularly.  </li><li>Teach students using Play way method or Project Based learning .<br/></li><li>B.Ed/ Montessori <font class="gmail-hlite">teachers</font> training / Nursery <font class="gmail-hlite">teachers</font>training will be an added advantage. Freshers with good communication skills may also apply.</li></ol><div class="jDisc mt20" style="font-size: 12px;"></div>',
      min_experience: 0.0,
      max_experience: 15.0,
      job_category: "Full time",
      remark: "",
      job: 12,
      organization: 2
    },
    {
      createdAt: 1552960976454,
      updatedAt: 1552960976454,
      id: 14,
      job_title: "Curriculum Developer Math Edtech Bangalore",
      functional_area: "Curriculum Developer/Subject Matter Expert",
      min_salary: 3.0,
      max_salary: 8.0,
      is_salary_negotiable: true,
      job_location: "Bangalore",
      job_description:
        '<p><span style="font-size: 14px;float: none;">Currently, we have a job opening for Curriculum Developer Math with Leading Education Company. Its main mission to reach out to children everywhere to help them learn with understanding has created an online learning environment.</span></p><p><strong style="font-size: inherit;vertical-align: baseline;"><b><br/></b></strong></p><p><span style="font-size: inherit;vertical-align: baseline;"><b>Job Description:</b></span></p><p><span style="font-size: 12px;">1. Researching and understanding the Science of Learning by reading pedagogy related research work, analyzing its rich student response data, conducting student interviews and interacting with teachers to figure out how children think and learn. Fair component of data mining, data analysis in Excel is preferred. Optional: Some work in SQL programming</span></p><p><span style="font-size: 12px;">2. Using this research to build discerning questions and create interactive content like maths games, enrichment modules, etc to help children learn with understanding online. Optional: Coding the same in HTML5 by the person</span></p><p><span style="font-size: 12px;">3. Building notes that highlight misconceptions based on the data and insights, and providing tips to address the same. Think of creative ways to reduce and remove these misconceptions</span></p><p><span style="font-size: 12px;">4. Networking and collaborating with research institutes and scholars in India and globally to understand and implement their high-quality work</span></p><p><span style="font-size: 12px;">5. Publish papers in international education journals and presentations at TEDx type events</span></p><p><span style="font-size: 12px;">6. Do mini-projects from start to finish that aims to solve a big problem and allow for an “entrepreneurial” experience</span></p><p><span style="font-size: 12px;">7. Optional: Taking up special assignments – such as coding for partial solving, thinking of system architecture and improving the speed of the software by increasing efficiency through sophisticated algorithms</span></p><p><strong style="font-size: inherit;vertical-align: baseline;"><b><br/></b></strong></p><p><span style="font-size: inherit;vertical-align: baseline;"><b>Desired Profile/Skills:</b></span></p><p><span style="font-size: 12px;">1. Academic brilliance in High School and college, being in the top 20% in your batch throughout</span></p><p><span style="font-size: 12px;">2. Interested in delving deep into Maths and how kids learn</span></p><p><span style="font-size: 12px;">3. Excited about creating learning and IT solutions that will impact children and transform education</span></p><p><span style="font-size: 12px;">4. Ability to do quick math</span></p><p><span style="font-size: 12px;">5. Penchant for research- ability to interpret research papers written on Math along with strong quantitative and qualitative research skills</span></p><p><span style="font-size: 12px;">6. Should enjoy working in a team and across teams (within the Development team and the IT team)</span></p><p><span style="font-size: 12px;">7. Should enjoy healthy debates and arguments which are critical for insight development</span></p><p><span style="font-size: 12px;">8. Desired but not necessary: Ability to quickly and independently learn new technologies like HTML5 and sufficient experience in PHP, MySQL</span></p><!--EndFragment--><p><br/></p><p>Job Location - Bangalore </p><div><br/></div><div>Need some information from your side:-</div><div><br/></div><div>1. Current CTC:-</div><div>2. Expected CTC:-</div><div>3. Notice Period:-</div><div>4. Ready to relocate to Bangalore:- <br/><p></p><p><!--EndFragment--><br/><br/><!--StartFragment--></p><ul style="font-size: 12px;vertical-align: baseline;"><p class="careers-content" style="font-size: 12px;vertical-align: baseline;width: 650px !important;"><span id="selectionBoundary_1510575907497_13815751625437311" class="rangySelectionBoundary">&#65279;</span><br/></p></ul><br/><br/><br/><p></p><p><br/></p></div>',
      min_experience: 1.0,
      max_experience: 8.0,
      job_category: "Full time",
      remark: "",
      job: 14,
      organization: 2
    },
    {
      createdAt: 1552960976299,
      updatedAt: 1552960976299,
      id: 7,
      job_title: "AGM Content For A Chain Of School In Hyderabad",
      functional_area: "Curriculum Developer/Subject Matter Expert",
      min_salary: 6.0,
      max_salary: 10.0,
      is_salary_negotiable: true,
      job_location: "Hyderabad",
      job_description:
        '<div><span style="font-size: 14px;"><b>Role and Responsibility </b></span></div><p><span style="font-size: 14px;"></span></p><div><span style="font-size: 14px;"><br/></span></div><p>1.Lead the team of Content Developers, Trainers and Implementation Staff.</p><p><br/></p><p>2.Designing the academic blueprint of <br/></p><p><span style="font-size: 14px;">franchise </span>in alignment with the vision of the Organisation\'s philosophy and value proposition of the brand </p><p><br/></p><p>3.Product Development - work with Coordinators, Subject Matter Experts and curriculum development team in the initial phase and create an IP over a period of time </p><p><br/></p><p>4.Designing teacher training module and conduct training.<br/></p><p><br/></p><p>5.Define the core philosophy of learning in alignment with vision, mission, goal and value proposition of the new entity through discussions with the CEO and the promoters <br/></p><p><br/></p><p>6.Play a pivotal role in leading the brand by modeling integrity, vision and ethical behavior <br/></p><p><br/></p><p>7.Recruit and build the academic/product development and implementation team<br/></p><p><br/></p><p>8.To Ensure Academic implementations of all academic procedures, training and optimum utilization of Knowledge Bank, Edipedia, 3C Curriculum and other available resources through online for all franchise Schools.<br/></p><p><br/></p><p>9.Ensure proper academic plan, timely preparations of Year Book, Diaries etc. Strict adherance to budgets.<br/></p><p><br clear="all"/></p><div><b>Experience :</b><br/></div><div><br/></div><div><span style="font-size: 13px;text-align: center;">12-15 years of proven experience in the field of K-12 education/preschool/curriculum development with at least five years in a senior </span><span style="text-align: center;font-size: 14px;"><b>academic</b></span><span style="text-align: center;font-size: 14px;"> leadership role</span><br/></div><div><span style="text-align: center;font-size: 14px;"><br/></span></div><div><b>Additional Skill :</b></div><div><span style="font-size: 13px;"><br/></span></div><div><span style="font-size: 13px;">Research, reading, public relation, good in conducting group activities, Formulating and following Standard operating procedures, Interpersonal Skills good rappot/ network with education ,media</span><b><br/></b></div><div><b><br/></b></div><div><b>Addition Requirement :</b></div><div><span style="font-size: 13px;">Have to Travel atleast 10 Days in each Month, Similars to Principals Position with School  Management, Analytical and Problem Solving ability  with 2 Yrs</span><br/></div>',
      min_experience: 5.0,
      max_experience: 15.0,
      job_category: "Full time",
      remark: "",
      job: 6,
      organization: 2
    },
    {
      createdAt: 1552960976363,
      updatedAt: 1552960976363,
      id: 8,
      job_title: "Software Developer",
      functional_area: "Software Development",
      min_salary: 2.0,
      max_salary: 6.0,
      is_salary_negotiable: true,
      job_location: "Ahmedabad",
      job_description:
        "<p><br/></p><p>Currently, we have a job opening for Software Developer with Leading Education Company. Its main mission to reach out to children everywhere to help them learn with understanding has created an online learning environment.</p><p><b>Job Description <br/></b></p><p>1. Strong PHP, Javascript, OOPS Concepts, HTML5, CSS, Javascript with working experience in common libraries<br/>and frameworks<br/>2. Worked on Database (MYSQL, SQL, ORACLE, RDBMS, NoSQL, MongoDB)<br/>3. Fair knowledge of AngularJS, ReactJS, Canvas and SVG interactive programming, Responsive web design<br/>4. Cloud platform experience will be an advantage<br/>5. Knowledge of frameworks like Code Igniter, Zend, Data Structures and database concepts<br/></p><p><b>Job Description - Ahmedabad </b><br/><br/>Need some information from your side:-</p><p>1. Current CTC:-</p><p>2. Expected CTC:-</p><p>3. Notice Period:-</p><p>4. Ready to relocate to Ahmedabad:-</p><p><br/><br/></p>",
      min_experience: 1.0,
      max_experience: 4.0,
      job_category: "Full time",
      remark: "",
      job: 7,
      organization: 2
    },
    {
      createdAt: 1552960976372,
      updatedAt: 1552960976372,
      id: 9,
      job_title: "Game Designer",
      functional_area: "Game Designer ",
      min_salary: 2.0,
      max_salary: 6.0,
      is_salary_negotiable: true,
      job_location: "Bangalore",
      job_description:
        '<p><span style="font-size: 14px;float: none;">Job Description -</span></p><p><span style="font-size: 14px;float: none;">Currently, we have a job opening for Software Developer with Leading Education Company. Its main mission to reach out to children everywhere to help them learn with understanding has created an online learning environment.</span></p><p><!--EndFragment--><font color="#949494">Key skills:</font></p><p><font color="#949494"><br/>1. Deep understanding of the casual game mechanics.<br/>2. Have a good grasp on Photoshop, Illustrator or Flash with decent knowledge and experience on game art and character design<br/>3. Fair understanding of browser and mobile based game development technologies<br/>4. Strong creative identity, imagination and holistic game design skill<br/>5. Creatively, analytically and organizationally skilled with proven ability to write, to communicate and to maintain detailed game design document throughout games life cycle<br/>6. Solid knowledge of game industry, trends, competition, platforms and market.</font></p><p><font color="#949494"><br/>Roles and responsibilities:</font></p><p><font color="#949494"><br/>1. Responsible for creating highly detailed design documents which contains a blueprint for the entire game’s design, game play, story, dialogue, menu text, narration and interface.<br/>2. Organize and conduct play tests to get feedback on ideas and prototypes<br/>3. Studying/analysing the existing in-product games and work towards re-designing them.<br/>4. Analyzing feedback and metrics make necessary game design changes accordingly.<br/>5. Provide artists with detailed guidance, reference images, and UX mock-ups in order to reduce art iteration time.<br/>6. Pitch the new ideas to the team and hold brainstorming sessions.</font></p><p><font color="#949494"><br/></font></p><p><font color="#949494">Job Location - Bangalore </font></p><p><font color="#949494"><br/></font></p><p><font color="#949494">Need some information from your side:-</font></p><p><font color="#949494">1. Current CTC:-</font></p><p><font color="#949494">2. Expected CTC:-</font></p><p><font color="#949494">3. Notice Period:-</font></p><p><font color="#949494">4. Ready to relocate to Bangalore:-<br/></font><br/><br/><br/></p>',
      min_experience: 1.0,
      max_experience: 5.0,
      job_category: "Full time",
      remark: "",
      job: 8,
      organization: 2
    },
    {
      createdAt: 1552960976389,
      updatedAt: 1552960976389,
      id: 10,
      job_title: "2D Game Artist",
      functional_area: "Game Artist",
      min_salary: 3.0,
      max_salary: 10.0,
      is_salary_negotiable: true,
      job_location: "Gurgaon",
      job_description:
        '<p><font style="font-size: 12.8px;"><g class="gr_ gr_11 gr-alert gr_gramm gr_inline_cards gr_run_anim Punctuation only-ins replaceWithoutSep" id="11" style="font-size: inherit !important;">Currently</g> have a <span class="gmail-m_4187472356284258772gmail-m_-2086361044722429538gmail-m_-2783288552690601826gmail-m_-6777469244350355716gmail-m_128814327279300265gmail-m_3318483611834855429gmail-m_-8493134656870245389gmail-m_2901434013736814129gmail-m_-7235925590964417970gmail-m_3976100253912975187gmail-m_-1531384002335150202gmail-m_4434395905434295700gmail-m_7225272056922755812gmail-m_7141229577115000264gmail-m_5980662464715682233gmail-m_5704603101220506748gmail-m_5268278145994668561gmail-m_-5033932393313706847gmail-m_3326527267413662747gmail-m_-6852060907955526189gmail-m_-2205278927519767381gmail-m_-940442951341133065m_-8112340187694707528gmail-m_-2982211560415128236gmail-m_-1525079226354211956gmail-m_8456407422138134412gmail-m_9198428023811829026m_8725004299267539690m_1355570419953615554m_5630103675759091034m_4824150108848926190m_-2284147739991062878gmail-il">job</span> opening for the position of </font></p><p><span style="font-size: 12.8px;"><b> 2D Game Artist</b></span></p><p><font style="font-size: 12.8px;"><b> </b>with Leading Education Company. Its <span style="font-size: 12.8px;">vision is to transform K-12 learning by making it fun and personalized for every child and to prepare them for skills required. It <span style="font-size: 12.8px;">is uniquely poised to harness the rapid growth in the education technology space using the backdrop of the ubiquitous adoption of smartphones, tablets, AR and VR.</span></span></font></p><div><!--EndFragment--><font color="#000000"></font><p><br/></p><p>Qualification & Experience</p><p><br/>1. 2 to 6 years of Experience in game development and game art<br/>2. Proven experience of working on 2D Casual social and/or mobile Games across different genres<br/>3. Expertise in Photoshop, Illustrator, Flash 2D animation tools<br/>4. Ability to create a variety of production quality artwork with experience in user interface design and animation<br/>5. Proficient in segmented and texture sprite animations<br/>6. A well-developed sense of color and composition with substantial interest in form and typography<br/>7. An excellent team player with good communication and organization skills who demonstrates pride and responsibility in your work and modest and respectful when getting feedback.<br/>8. Demonstrate passion for playing games<br/>9. A portfolio showing your talent and flexibility<br/><br/>Responsibilities</p><p><br/>1. Create beautiful characters, assets, environments and animations to be rolled out into the game and game characters<br/>2. Work closely with the development team to implement art into the finished product<br/>3. Art specialties may include environment (props, buildings, landscapes, lighting and texturing), effects, icons and user interface<br/>4. Support Team in Game Design</p><p><br/>Keywords</p><p><br/>1. Sketching<br/>2. Photoshop<br/>3. Illustrator<br/>4. Flash 2D<br/>5. Animation Tools<br/></p><p><br/></p><p>Job Location - Gurgaon</p><p><br/></p><p>Need some information from your side:-</p><p>1. Current CTC:-</p><p>2. Expected CTC:-</p><p>3. Notice Period:-</p><p>4. Ready to relocate to Gurgaon:-</p><font style="font-size: 12.8px;"><span style="font-size: 12.8px;float: none;"><span style="font-size: 12.8px;"></span><br/></span><span style="font-size: 12.8px;"><!--EndFragment--><br/></span><br/><!--EndFragment--><br/><br/></font><!--EndFragment--><br/><br/><p><br/></p></div>',
      min_experience: 2.0,
      max_experience: 6.0,
      job_category: "Full time",
      remark: "",
      job: 9,
      organization: 2
    },
    {
      createdAt: 1552960976595,
      updatedAt: 1552960976595,
      id: 17,
      job_title: "Academic Coordinator Mumbai",
      functional_area: "Academic cordinator",
      min_salary: 3.0,
      max_salary: 7.0,
      is_salary_negotiable: true,
      job_location: "Mumbai",
      job_description:
        '<ul class="listing mt10 wb" style="font-size: 13px;">We are hiring for a leading chain of schools in Mumbai and looking to hire Academic Co-ordiantor on urgent basis . <div style="font-size: 12px;"><br/></div><div style="font-size: 12px;">Location : Kurla / Malad / Thane </div><div style="font-size: 12px;"><ul><div style="font-size: 12px;">We are looking for a female candidate who can:</div><div style="font-size: 12px;"><br/></div><div style="font-size: 12px;"><ul><li style="font-size: 13px;">1. Coordinate administrative tasks.<br/></li><li style="font-size: 13px;">2.Research, Compile and prepare all correspondences and communication, reports and recommendations, and presentations related with the Academic Head.<br/></li><li style="font-size: 13px;">3.Computer Savvy- Ms Office (MS-word, MS-powerpoint and MS-Excel)<br/></li><li style="font-size: 13px;">4.Good in drafting mails.<br/></li><li style="font-size: 13px;">5.Should have  good communication skill</li><li style="font-size: 13px;">6.Time Management - appropriate allocation of time to prioritize the work schedules, urgent and important matters come up from time to time and ensuring meeting datelines</li><li style="font-size: 13px;"></li></ul></div></ul></div><div style="font-size: 12px;"><br/></div></ul>',
      min_experience: 1.0,
      max_experience: 10.0,
      job_category: "Full time",
      remark: "",
      job: 17,
      organization: 2
    },
    {
      createdAt: 1552960976610,
      updatedAt: 1552960976610,
      id: 18,
      job_title: "IOS developer Edtech Gurgaon",
      functional_area: "Software Development",
      min_salary: 7.0,
      max_salary: 15.0,
      is_salary_negotiable: true,
      job_location: "Gurgaon",
      job_description:
        '<p><span style="font-size: 14px;float: none;">Currently, we are </span><span id="selectionBoundary_1510548406065_4117289020137491" class="rangySelectionBoundary" style="font-size: 14px;">&#65279;</span><span style="font-size: 14px;float: none;">looking for iOS Engineer for Leading Education Company. Its main vision is to transform K-12 learning by making it fun and personalized for every child and to prepare them for skills required.</span><!--EndFragment--><br/><br/></p><p>Key Responsibilities:</p><p><br/>1. Implement and test our core experience on iOS.<br/>2. Interface with the design team to bring their user experience designs to life.<br/>3. Stay up to date with the new API’s/Functionalities periodically released in iOS.</p><p><br/>Desired Skills and Experience</p><p><br/>1. B.Tech in Computer Science preferred<br/>2. Experience with iOS App development for at least 2 years.<br/>3. Should have apps on App Store.<br/>4. Experience in building apps for iPhone/iPad using Objective C, Cocoa Frameworks, XCode and Interface Builder<br/>5. Good knowledge of iOS SDK, Foundation Framework and Memory Management<br/>6. Working experience with JSON and familiarity with REST/SOAP methodologies.<br/>7. Strong knowledge of SQL and relational database programming<br/>8.Understanding of source control (experience with GIT preferred)<br/>9. Published one or more apps on the AppStore<br/>10. Knowledge of C++, JS and Gaming frameworks like Cocos2dx is a big plus.<br/></p><p>Job Location - Gurgaon<br/></p><p>Need some information from your side.<br/></p><p>1. Current CTC:-</p><p>2. Expected CTC:-</p><p>3. Notice Period:-</p><p>4. Ready to relocate to Gurgaon:-</p>',
      min_experience: 1.0,
      max_experience: 3.0,
      job_category: "Full time",
      remark: "",
      job: 18,
      organization: 2
    },
    {
      createdAt: 1552960976812,
      updatedAt: 1552960976812,
      id: 26,
      job_title: "Associate Vice President  Business Development",
      functional_area: "Business Development",
      min_salary: 25.0,
      max_salary: 30.0,
      is_salary_negotiable: true,
      job_location:
        "Mumbai (All Areas),Delhi/NCR,Bengaluru/Bangalore,Bangalore",
      job_description:
        '<ul style="font-size: 12px;vertical-align: baseline;"><strong style="font-size: inherit;vertical-align: baseline;"><b></b><strong style="font-size: inherit;vertical-align: baseline;"><b></b><strong style="font-size: inherit;vertical-align: baseline;"><b></b></strong></strong></strong><p style="font-size: inherit;vertical-align: baseline;"><strong id="LSA-BD" style="font-size: inherit;vertical-align: baseline;"><b>18. Associate Vice President – Business Development </b></strong></p><p style="font-size: inherit;vertical-align: baseline;">Role: Business Development / Institutional Sales – Mindspark in government schools</p><p style="font-size: inherit;vertical-align: baseline;">This role is for you if you are strong in Institutional Sales and deeply interested in using your skills to make a larger impact. Would you like to bring a meaningful high-quality learning product to low-income children who deserve it the most? </p><p style="font-size: inherit;vertical-align: baseline;">This is an endeavour that is not restricted to some urban centres or just India, but aimed to eventually have a scalable impact across the nation and the world. Does the thought of playing a meaningful catalytic role by channelizing the large sums of money spent in the education sector to improve learning outcomes excite you? </p><p style="font-size: inherit;vertical-align: baseline;">If yes, join the Large Scale Educations Program division of Educational Initiatives – a 16 year old institution that is internationally known for its work in measuring learning outcomes and creating solutions to making it happen. </p><p style="font-size: inherit;vertical-align: baseline;">EI’s work has been recognized in a cover story of the <a href="http://blog.ei-india.com/2017/08/11/mindspark-has-been-featured-in-the-economist/" style="font-size: inherit;vertical-align: baseline;">Economist</a>, captured in a Harvard Business School case, made it to the final rounds at Qatar Foundation’s WISE Awards and demonstrated impact by several independent 3rd party evaluation agencies like J-PAL. All these recognitions will act as solid Marketing collateral in your endeavor to seek philanthropy capital. </p><p style="font-size: inherit;vertical-align: baseline;">Your role is to take an existing implementation that is touching 100,000 children in 250 government and private schools and evangelize it to grow 100x to 10 million children in 5-10 States in 1-2 countries over the next 3-5 years. You would do this by raising philanthropic funding from (1) corporate CSR heads – more than Rs. 20,000+ Crore is spent annually by Corporate Social Responsibility (CSR) and education is the largest chunk and (2) international foundations and multi-lateral aid agencies (eg. USAID, UKAid, UNICEF, World Bank, etc) that are interested in funding social development projects. Winning government tenders for learning software is also a third route that can be used.</p><p style="font-size: inherit;vertical-align: baseline;"><strong style="font-size: inherit;vertical-align: baseline;"><b>Here are some reasons to join this meaningful Sales / Business Development role:</b></strong></p><ul style="font-size: inherit;vertical-align: baseline;"><li style="font-size: 12px;vertical-align: baseline;width: 437px;">There are 250 million children going to government schools everyday. Unless we act fast, these children are growing older and graduating from schools with little employable or life skills. Your work will directly ensure that these children are learning with understanding.</li><li style="font-size: 12px;vertical-align: baseline;width: 437px;">You will be able to ensure that the CSR heads are getting a sound return on investment of their money. </li><li style="font-size: 12px;vertical-align: baseline;width: 437px;">You will interact with EI’s CEO and the Board of Directors who are all very passionate about serving this segment of the demographic.</li><li style="font-size: 12px;vertical-align: baseline;width: 437px;">The monetary rewards will mimic entrepreneurship to the fullest extent – your basic needs will get covered and there is potential to make this financially satisfying – but your ultimate rewards will be creating something innovative and taking into scale under your leadership. An opportunity of a lifetime! </li><li style="font-size: 12px;vertical-align: baseline;width: 437px;">You will need patience with some long sales cycles and ingenuity in seeking competitive grant funding.</li></ul><p style="font-size: inherit;vertical-align: baseline;"><strong style="font-size: inherit;vertical-align: baseline;"><b>Desired attributes in candidate:</b></strong></p><ul style="font-size: inherit;vertical-align: baseline;"><li style="font-size: 12px;vertical-align: baseline;width: 437px;">Preference given to candidates who have B2B / Institutional Sales experience</li><li style="font-size: 12px;vertical-align: baseline;width: 437px;">Preference given to candidates who have experience in managing government relations or doing government sales; but not necessary.</li><li style="font-size: 12px;vertical-align: baseline;width: 437px;">Minimum 5 years of experience in doing Sales – including cold-calling, seeking appointments and doing meetings, proposal writing, finalizing contracts and winning repeat business </li></ul><p style="font-size: inherit;vertical-align: baseline;"><strong style="font-size: inherit;vertical-align: baseline;"><b>Visual imagery and details available at www.ei-india.com and:</b></strong></p><ul style="font-size: inherit;vertical-align: baseline;"><li style="font-size: 12px;vertical-align: baseline;width: 437px;">An article about Mindspark’s impact authored by David Evans for the World Bank blog <a href="http://blog.ei-india.com/2017/08/11/mindspark-has-been-featured-in-the-economist/" style="font-size: inherit;vertical-align: baseline;">here</a></li><li style="font-size: 12px;vertical-align: baseline;width: 437px;"><a href="https://www.youtube.com/watch?v=pji_gHFvvN0&amp;t=38s" style="font-size: inherit;vertical-align: baseline;">Panel</a> on Disrupting Education hosted by Natasha Jog on NDTV </li><li style="font-size: 12px;vertical-align: baseline;width: 437px;">A <a href="https://www.youtube.com/watch?v=b84u7m2FVPk&amp;t=57s" style="font-size: inherit;vertical-align: baseline;">video</a> summary of the Mindspark program and its impact</li><li style="font-size: 12px;vertical-align: baseline;width: 437px;"><a href="https://www.youtube.com/watch?v=C_GYwSIt6bM" style="font-size: inherit;vertical-align: baseline;">Video</a> of Mindspark in a HP lab in a box </li><li style="font-size: 12px;vertical-align: baseline;width: 437px;">Mention of Mindspark in <a href="https://ssir.org/articles/entry/leapfrogging_toward_success_in_education" style="font-size: inherit;vertical-align: baseline;">Stanford Social Innovation Review</a> and <a href="http://blog.ei-india.com/2017/08/11/mindspark-has-been-featured-in-the-economist/" style="font-size: inherit;vertical-align: baseline;">Economist</a></li></ul><p style="font-size: inherit;vertical-align: baseline;"><strong style="font-size: inherit;vertical-align: baseline;"><b>Location: </b></strong>Bangalore/Delhi/Mumbai<br/></p></ul>',
      min_experience: 5.0,
      max_experience: 10.0,
      job_category: "Full time",
      remark: "",
      job: 26,
      organization: 2
    },
    {
      createdAt: 1552960976409,
      updatedAt: 1552960976409,
      id: 11,
      job_title: "Teacher Trainer Education Coach for Education Company",
      functional_area: "Academic Trainer",
      min_salary: 4.0,
      max_salary: 8.0,
      is_salary_negotiable: true,
      job_location: "Chennai,Vijaywada,Rajahmundry,Kurnool,Kanyakumari",
      job_description:
        "<p><b>About the Role:</b><br/>Education Coach will report to Senior Education Coach and will be based out of any city across the country, however, the role will require extensive travel to schools within the assigned geography and sometimes even outside the assigned territory. Education Coach will be the face of Company in the school, therefore, the roles require high level of ownership, customer focus and commitment. The role requires imparting training to the teachers, coaching &amp; support to the school leaders and ongoing observation &amp;<br/>coaching to the teachers on the Company implementation in the school. An important part of Education coach role is to provide clarifications, suggestions, and answers to Company implementation related queries<br/>of the school and openly communicate issues &amp; challenges in the schools with the Senior EC<br/><br/></p><p>The person also needs to follow-up and collect all outstanding and renew school contracts every academic year.</p><p><br/><b>Industry:</b> Education / Teaching / Training<br/><b>Functional Area:</b> Teaching, Education, Training, Counseling<br/><b>Role Category:</b> Teachers<br/><b>Role:</b> Trainer<br/><b>Key skills:</b><br/>Teacher training, teaching trainer, teachers Teaching, and Training, Training &amp; Development<br/></p><p><br/></p><p>Education-<br/>UG: Any Graduate - Any Specialization<br/><br/>PG: Any Postgraduate - Any Specialization<br/><br/>Past teaching experience (at least 3-5 years) preferably with exposure to experiential learning<br/>Degree in education/key subjects (Science, Mathematics, English, Social Science) is desirable, not essential Past experiences of training &amp; coaching is desirable<br/>SHOULD BE OPEN TO TRAVEL OUTSTATION (15-18 days in a month)<br/>Ability to demonstrate a good  class<br/><br/>Ability to run group sessions including training and circle time<br/>Ability to communicate clearly across levels Need to work closely with Owners, Principals, and teachers.<br/>Time management Calendar discipline as the person would be traveling meeting multiple people<br/>Customer orientation &amp; quick response time.<br/>Zeal to understand the customer requirements and support them</p><p><br/><b>Assertive &amp; confident:</b> Will have to deal with older/more experience/difficult people, must be able to hold their own<br/>Ability to learn and un-learn and generally should be a thoughtful person<br/></p>",
      min_experience: 2.0,
      max_experience: 10.0,
      job_category: "Full time",
      remark: "",
      job: 11,
      organization: 2
    },
    {
      createdAt: 1552960976672,
      updatedAt: 1552960976672,
      id: 21,
      job_title: "Curriculum Designer English K12",
      functional_area:
        "Curriculum Developer / Content Writer/ Subject Matter Expert",
      min_salary: 4.0,
      max_salary: 12.0,
      is_salary_negotiable: true,
      job_location: "Delhi/NCR",
      job_description:
        '<p><span style="background-color: transparent;font-size: 12pt;text-align: justify;"><b>Role: Consulting Author a Curriculum Designing Company </b></span></p><p><span style="background-color: transparent;font-size: 12pt;">A Consulting Author will be responsible for the following:</span></p><ol><li dir="ltr" style="font-size: 12pt;color: #000000;background-color: transparent;vertical-align: baseline;"><p dir="ltr"><span style="font-size: 12pt;color: #000000;background-color: transparent;vertical-align: baseline;">Designing daily lessons plans for teaching topics in their domain with effective activities and clear, accurate explanations</span></p></li><li dir="ltr" style="font-size: 12pt;color: #000000;background-color: transparent;vertical-align: baseline;"><p dir="ltr"><span style="font-size: 12pt;color: #000000;background-color: transparent;vertical-align: baseline;">Researching and writing grade appropriate technical content texts (i.e., textbook material) for given topics</span></p></li><li dir="ltr" style="font-size: 12pt;color: #000000;background-color: transparent;vertical-align: baseline;"><p dir="ltr"><span style="font-size: 12pt;color: #000000;background-color: transparent;vertical-align: baseline;">Creating application and assessment tasks for students to show mastery of the topic</span></p></li><li dir="ltr" style="font-size: 12pt;color: #000000;background-color: transparent;vertical-align: baseline;"><p dir="ltr"><span style="font-size: 12pt;color: #000000;background-color: transparent;vertical-align: baseline;">Designing and developing digital content for classroom and home-based use</span></p></li><li dir="ltr" style="font-size: 12pt;color: #000000;background-color: transparent;vertical-align: baseline;"><p dir="ltr"><span style="font-size: 12pt;color: #000000;background-color: transparent;vertical-align: baseline;">Participating in a rigorous peer review process to both give and receive/incorporate constructive feedback on teaching/learning materials with the goal of improving effectiveness and quality</span></p></li></ol><p><br/></p><p><br/></p><p dir="ltr"><span style="font-size: 12pt;color: #000000;background-color: transparent;vertical-align: baseline;">The Consulting Author will work with the Academic Manager, Authors and Editors to improve the quality of learning programs and to ensure that all parts are completed on time. The Consulting Author will collaborate with the larger multi-disciplinary design team to review content and make product decisions. </span></p><p><br/></p><p><b id="docs-internal-guid-2f1e9e09-cd9a-7fe5-a444-423b778aa778"></b></p><p dir="ltr" style="text-align: justify;"><span style="font-size: 11pt;color: #000000;background-color: transparent;vertical-align: baseline;"><b>The candidate will be able to: </b></span></p><p><br/></p><ul><li dir="ltr" style="font-size: 11pt;color: #000000;background-color: transparent;vertical-align: baseline;"><p dir="ltr"><span style="font-size: 11pt;color: #000000;background-color: transparent;vertical-align: baseline;">Research best practices/methods from multiple sources</span></p></li></ul><ul><li dir="ltr" style="font-size: 11pt;color: #000000;background-color: transparent;vertical-align: baseline;"><p dir="ltr"><span style="font-size: 11pt;color: #000000;background-color: transparent;vertical-align: baseline;">Write about technical, academic concepts clearly and concisely in a way understandable to teachers and children</span></p></li></ul><ul><li dir="ltr" style="font-size: 11pt;color: #000000;background-color: transparent;vertical-align: baseline;"><p dir="ltr"><span style="font-size: 11pt;color: #000000;background-color: transparent;vertical-align: baseline;">Develop detailed and age-appropriate Lesson Plans, Worksheets and Assessment tasks, and subject-specific content texts</span></p></li></ul><ul><li dir="ltr" style="font-size: 11pt;color: #000000;background-color: transparent;vertical-align: baseline;"><p dir="ltr"><span style="font-size: 11pt;color: #000000;background-color: transparent;vertical-align: baseline;">Use Microsoft Word and adhere to formatting standards</span></p></li></ul>',
      min_experience: 2.0,
      max_experience: 10.0,
      job_category: "Full time",
      remark: "",
      job: 21,
      organization: 2
    },
    {
      createdAt: 1552960976899,
      updatedAt: 1552960976899,
      id: 31,
      job_title: "Lead Educational Specialist Math Assessments",
      functional_area: "Content Head / Subject Lead ",
      min_salary: 6.0,
      max_salary: 12.0,
      is_salary_negotiable: true,
      job_location: "Bengaluru/Bangalore",
      job_description:
        '<p><br/></p><p><span style="font-size: 12.8px;float: none;">Currently, we have a job opening for the position of <b>Lead Educational Specialist Math Assessments</b> for Leading Education Company. </span></p><p><br/></p><p><br/></p><p><br/></p><p><strong style="font-size: inherit;vertical-align: baseline;"><b>1. Managing a team of Educational specialists and the content being delivered</b></strong></p><div><span style="font-size: 12px;">a) Planning monthly tasks for the team and ensuring the goals are met</span></div><div><span style="font-size: 12px;">b) Monitor and share progress on tasks regularly and send regular updates on the same</span></div><div><span style="font-size: 12px;">c) Ensuring the quality of the content is being reviewed as per the set processes</span></div><div><span style="font-size: 12px;">d) Coordinating with internal teams in order to understand task priorities and get certain tasks done</span></div><div><span style="font-size: 12px;">e) Help in sourcing and interviewing candidates as per need</span></div><div><p><br/></p><strong style="font-size: inherit;vertical-align: baseline;"><b>2. Creating engaging content for the assessment products, ASSET and Detailed Assessment, which includes-</b></strong></div><div><span style="font-size: 12px;">a) Sourcing suitable engrossing passages for reading and comprehension</span></div><div><span style="font-size: 12px;">b) Creative ways of assessing comprehension, </span>grammar<span style="font-size: 12px;"> and vocabulary</span><span style="font-size: 12px;"><br/></span><strong style="font-size: inherit;vertical-align: baseline;"><b><br/></b></strong></div><div><strong style="font-size: inherit;vertical-align: baseline;"><b>3. Reviewing content, focusing on –</b></strong></div><div><span style="font-size: 12px;">a) Quality of the question (concept tested, grade appropriateness, phrasing)</span></div><div><span style="font-size: 12px;">b) Technical correctness</span></div><div><span style="font-size: 12px;">c) Strength of the distractors</span></div><div><span style="font-size: 12px;">d) Syntactical/semantic errors</span></div><div><p><br/></p><span style="font-size: inherit;vertical-align: baseline;"><b><b>4. Researching on language acquisition/teaching methodologies –</b></b>a)<b><b> </b></b></span><span style="font-size: 12px;">Through reading of academic journals</span></div><div><span style="font-size: 12px;">b) Analysing data on questions</span></div><div><span style="font-size: 12px;">c) By interacting with external subject experts</span></div><div><span style="font-size: 12px;">d) By interacting with students and understanding how they think</span></div><div><p><br/></p><strong style="font-size: inherit;vertical-align: baseline;"><b>Required Skills:</b></strong></div><div><b>a) </b><span style="font-size: 12px;">3+ years of experience in content and team management/teaching role</span></div><div><span style="font-size: 12px;">b) Ability to manage a team of 3-5 members</span></div><div><span style="font-size: 12px;">c) Excellent written and oral communication skills</span></div><div><span style="font-size: 12px;">d) Ability to create and source engaging assessments for students</span></div><div><span style="font-size: 12px;">e) Ability to critically </span>analyse<span style="font-size: 12px;"> questions, tests, and projects for practical use in the context of the classroom</span></div><div><span style="font-size: 12px;">f) Basic technological awareness (Windows functions, MS Office, email features)</span></div><div><span style="font-size: 12px;">g) Sticking to tight schedules and effective workload management</span></div><div><strong style="font-size: inherit;vertical-align: baseline;"><b><br/></b></strong></div><div><strong style="font-size: inherit;vertical-align: baseline;"><b>Preferred Skills:</b></strong></div><div><span style="font-size: 12px;">a) Subject background in Maths/Science, at a Masters’ level or above</span></div><div><span style="font-size: 12px;">b) Ability to interact in a productive manner with teachers and students, if needed; this should be geared towards gleaning information that will help us improve our understanding of how students learn and also towards improving our offerings</span></div><div><span style="font-size: 12px;">c) Should enjoy working in a team and across teams</span></div><div><span style="font-size: 12px;">d) Should enjoy healthy debates and arguments which are critical for insight development</span></div><div><p><br/></p><p>Job Location - Bangalore </p><br/></div>',
      min_experience: 3.0,
      max_experience: 8.0,
      job_category: "Full time",
      remark: "",
      job: 32,
      organization: 2
    },
    {
      createdAt: 1552960977170,
      updatedAt: 1552960977170,
      id: 41,
      job_title: "Curriculum Developer Social Science",
      functional_area:
        "Curriculum Developer / Content Writer/ Subject Matter Expert",
      min_salary: 5.0,
      max_salary: 10.0,
      is_salary_negotiable: true,
      job_location: "Gurgaon",
      job_description:
        '<p style="font-size: 14px;">Currently, we have a job opening for <b><b></b><b><b>Curriculum Developer</b></b> Social</b> <b><b>Science</b></b> for Leading Education Company. </p><p style="font-size: 14px;"><br/></p><p style="font-size: 14px;"><b><b></b><b><b><span style="font-size: 10pt;color: black;">A Consulting Author will be responsible for the following:</span></b></b></b><b><b></b><b><b><span style="font-size: 10pt;"></span></b></b></b></p><p style="font-size: 14px;vertical-align: baseline;"><span style="font-size: 10pt;color: black;">The Consulting Author will work with the Academic Manager, Authors and Editors to improve the quality of learning programs and to ensure that all parts are completed on time. The Consulting Author will collaborate with the larger multi-disciplinary design team to review content and make product decisions.</span></p><p style="font-size: 14px;"><b><b></b><b><b><span style="font-size: 10pt;color: black;">Knowledge &amp; Experience</span></b></b></b></p><p style="font-size: 14px;"><span style="color: black;font-size: 10pt;"><b><b></b><b><b>1. </b></b></b>2+ years education experience</span></p><p style="font-size: 14px;"><span style="color: black;font-size: 10pt;">2. At least 1 year in classroom teaching in Grade 1-8 in the subject area applied for</span></p><p style="font-size: 14px;"><span style="color: black;font-size: 10pt;">3. Must have used experiential teaching methods in the classroom</span></p><p style="font-size: 14px;"><span style="color: black;font-size: 10pt;">4. At least </span>1-year<span style="color: black;font-size: 10pt;"> experience in a high-accountability workplace with targets and deadlines</span></p><p style="font-size: 14px;"><span style="color: black;font-size: 10pt;">5. Content/Curriculum writing/Publishing experience a plus</span></p><p style="font-size: 14px;"><b><b></b><b><b><span style="font-size: 10pt;color: black;">Skills</span></b></b></b></p><p style="font-size: 14px;text-align: justify;"><span style="font-size: 10pt;color: black;">The candidate will be able to:</span></p><p style="font-size: 14px;text-align: justify;"><span style="color: black;font-size: 10pt;">1. Research best practices/methods from multiple sources</span></p><p style="font-size: 14px;text-align: justify;"><span style="color: black;font-size: 10pt;">2. Write about technical, academic concepts clearly and concisely in a way understandable to teachers and children</span></p><p style="font-size: 14px;text-align: justify;"><span style="color: black;font-size: 10pt;">3. Develop detailed and age-appropriate Lesson Plans, Worksheets and Assessment tasks, and subject-specific content texts</span></p><p style="font-size: 14px;text-align: justify;"><span style="color: black;font-size: 10pt;">4. Use Microsoft Word and adhere to formatting standards</span></p><p><b style="font-size: 14px;"><b></b><b><b></b></b></b></p><div style="font-size: 14px;"><b><b></b><b><b><br/></b></b></b></div><p><span style="font-size: 14px;float: none;">Job Location - Gurgaon </span></p><p><br style="font-size: 14px;"/></p><p><br/></p>',
      min_experience: 3.0,
      max_experience: 8.0,
      job_category: "Full time",
      remark: "",
      job: 41,
      organization: 2
    },
    {
      createdAt: 1552960977532,
      updatedAt: 1552960977532,
      id: 58,
      job_title: "Social Science Teacher chain of school",
      functional_area: "Social Science Teacher",
      min_salary: 3.0,
      max_salary: 7.0,
      is_salary_negotiable: true,
      job_location: "Hyderabad",
      job_description:
        '<p><br/></p><p style="font-size: 14px;"><b><b></b><b><b>Roles and Responsibility</b></b></b></p><p style="font-size: 14px;"><br/></p><p style="font-size: 14px;">1. To be responsible for delivering lessons in accordance with the designed programme, corporate strategy, and guidelines</p><p style="font-size: 14px;">2. Utilize the worksheets, materials, teaching aids and methods that<br/>contribute to a climate where students are actively engaged in<br/>the meaningful learning experience.<br/>3. Promote maximum student participation and interest and assist<br/>students in analyzing and improving methods and habits of<br/>study.<br/></p><p style="font-size: 14px;"><b><b></b><b><b>‘Must have’ functional Competencies</b></b></b><br/><br/>1. A good scholastic record is essential.<br/></p><p style="font-size: 14px;">2. Should be well versed in the latest curriculum<br/>3. Should be dynamic, presentable &amp; confident.<br/>4. Ability to plan the lessons and deliver them efficiently to the<br/>students.<br/>5. Ability to make use of different teaching methods.</p><p><br/></p>',
      min_experience: 3.0,
      max_experience: 10.0,
      job_category: "Full time",
      remark: "",
      job: 58,
      organization: 2
    },
    {
      createdAt: 1552960977776,
      updatedAt: 1552960977776,
      id: 68,
      job_title: "Primary Teacher chain of school",
      functional_area: "Class Teacher/ Classroom coordinator",
      min_salary: 3.0,
      max_salary: 6.0,
      is_salary_negotiable: true,
      job_location: "Hyderabad",
      job_description:
        '<p><br/></p><p style="font-size: 14px;"><b><b></b><b><b>Roles and Responsibility</b></b></b></p><p style="font-size: 14px;"><br/></p><p style="font-size: 14px;">1. To be responsible for delivering lessons in accordance with the designed programme, corporate strategy, and guidelines</p><p style="font-size: 14px;">2. Utilize the worksheets, materials, teaching aids and methods that<br/>contribute to a climate where students are actively engaged in<br/>the meaningful learning experience.<br/>3. Promote maximum student participation and interest and assist<br/>students in analyzing and improving methods and habits of<br/>study.<br/></p><p style="font-size: 14px;"><b><b></b><b><b>‘Must have’ functional Competencies</b></b></b><br/><br/>1. A good scholastic record is essential.<br/></p><p style="font-size: 14px;">2. Should be well versed in the latest curriculum<br/>3. Should be dynamic, presentable &amp; confident.<br/>4. Ability to plan the lessons and deliver them efficiently to the<br/>students.<br/>5. Ability to make use of different teaching methods.</p><p><br/></p>',
      min_experience: 2.0,
      max_experience: 10.0,
      job_category: "Full time",
      remark: "",
      job: 59,
      organization: 2
    },
    {
      createdAt: 1552960976437,
      updatedAt: 1552960976437,
      id: 13,
      job_title: "Finance Accounts Manager",
      functional_area: "Finance and Accounts",
      min_salary: 5.0,
      max_salary: 8.0,
      is_salary_negotiable: true,
      job_location: "Bangalore",
      job_description:
        "<p><b>We are looking a Dedicated Charted Accountant for a leading Education Company for Finance and Accounts Manager Role. Following are the details of the job. </b></p><p><b><br/></b></p><p><b>Job Summary –</b> Responsible for overall sales booking &amp; debtor management<br/><b>Reports to –</b> Key Accounts Heads of respective states</p><p><br/><b>Roles and Responsibilities:</b><br/>Evaluation &amp; Approval of Sales order received from schools<br/>School-wise Sales/Revenue accounting<br/>Debtor management<br/>Bad debt management including settlement, write off as well as initiating legal action<br/>Collection forecasting along with business teams<br/>Preparation of MIS/data as per management requirement<br/><br/><b>Qualifications &amp; Experience:</b><br/>Chartered Accountant with 0-2 years of experience along with graduation from a reputed university<br/>Experience in education industry will be favorable<br/>CA cleared in first/second attempt will be preferred<br/><br/><b>Skills must have</b><br/>Accounting knowledge<br/>Experience of working in Tally<br/>Proficiency in excel<br/>Experience in statutory audit<br/>Good interpersonal skills</p><p><br/><b>Good to have</b><br/>Knowledge of excel macro<br/>Articleship from Big 4 firms/ mid-sized CA firm<br/>Experience of education industry<br/></p>",
      min_experience: 1.0,
      max_experience: 5.0,
      job_category: "Full time",
      remark: "",
      job: 13,
      organization: 2
    },
    {
      createdAt: 1552960976686,
      updatedAt: 1552960976686,
      id: 22,
      job_title: "Curriculum Developer French",
      functional_area:
        "Curriculum Developer / Content Writer/ Subject Matter Expert",
      min_salary: 4.0,
      max_salary: 7.0,
      is_salary_negotiable: true,
      job_location: "Mumbai (All Areas)",
      job_description:
        '<ul style="font-size: 13px;"><li style="font-size: 13px;">Position: Curriculum Developer </li><li style="font-size: 13px;">Subject - French </li><li style="font-size: 13px;">Location: Mumbai ( Multiple Locations)</li></ul><div><font color="#666666"></font><p><b>Role and Responsibilities </b></p></div><ul style="font-size: 13px;"><li style="font-size: 13px;">1.Design the overall <font class="hlite">curriculum</font> structure for our School curriculum.</li><li style="font-size: 13px;">2.Determine the competencies that are required to master each element of the <font class="hlite">curriculum.</font></li><li style="font-size: 13px;">3.Work closely with development team to develop ideas and concepts for the lesson as per the syllabus.</li><li style="font-size: 13px;">4.Create the <font class="hlite">curriculum</font> for all the grades for French Subject. </li><li style="font-size: 13px;">5.Create assessment for the subject to make sure that it meets desired curricular standards</li></ul><p>Selection Procedure after shortlisting :</p><p>Written test + Personal interview </p><p><br/></p><p><br/></p>',
      min_experience: 2.0,
      max_experience: 10.0,
      job_category: "Full time",
      remark: "",
      job: 22,
      organization: 2
    },
    {
      createdAt: 1552960976986,
      updatedAt: 1552960976986,
      id: 32,
      job_title: "Lead Educational Specialist Science Assessments",
      functional_area: "Content Head / Subject Lead ",
      min_salary: 6.0,
      max_salary: 12.0,
      is_salary_negotiable: true,
      job_location: "Bengaluru/Bangalore",
      job_description:
        '<p><br/></p><p><span style="font-size: 12.8px;float: none;">Currently, we have a job opening for the position of <b><b>Lead Educational Specialist Science Assessments</b></b> for Leading Education Company. </span></p><p><br style="font-size: 14px;"/></p><p><br style="font-size: 14px;"/></p><p><br style="font-size: 14px;"/></p><p><strong style="font-size: inherit;vertical-align: baseline;"><b></b><b><b>1. Managing a team of Educational specialists and the content being delivered</b></b></strong></p><div style="font-size: 14px;"><span style="font-size: 12px;">a) Planning monthly tasks for the team and ensuring the goals are met</span></div><div style="font-size: 14px;"><span style="font-size: 12px;">b) Monitor and share progress on tasks regularly and send regular updates on the same</span></div><div style="font-size: 14px;"><span style="font-size: 12px;">c) Ensuring the quality of the content is being reviewed as per the set processes</span></div><div style="font-size: 14px;"><span style="font-size: 12px;">d) Coordinating with internal teams in order to understand task priorities and get certain tasks done</span></div><div style="font-size: 14px;"><span style="font-size: 12px;">e) Help in sourcing and interviewing candidates as per need</span></div><div style="font-size: 14px;"><p><br/></p><strong style="font-size: inherit;vertical-align: baseline;"><b></b><b><b>2. Creating engaging content for the assessment products, ASSET and Detailed Assessment, which includes-</b></b></strong></div><div style="font-size: 14px;"><span style="font-size: 12px;">a) Sourcing suitable engrossing passages for reading and comprehension</span></div><div style="font-size: 14px;"><span style="font-size: 12px;">b) Creative ways of assessing comprehension, </span>grammar<span style="font-size: 12px;"> and vocabulary</span><span style="font-size: 12px;"><br/></span><strong style="font-size: inherit;vertical-align: baseline;"><b></b><b><b><br/></b></b></strong></div><div style="font-size: 14px;"><strong style="font-size: inherit;vertical-align: baseline;"><b></b><b><b>3. Reviewing content, focusing on –</b></b></strong></div><div style="font-size: 14px;"><span style="font-size: 12px;">a) Quality of the question (concept tested, grade appropriateness, phrasing)</span></div><div style="font-size: 14px;"><span style="font-size: 12px;">b) Technical correctness</span></div><div style="font-size: 14px;"><span style="font-size: 12px;">c) Strength of the distractors</span></div><div style="font-size: 14px;"><span style="font-size: 12px;">d) Syntactical/semantic errors</span></div><div style="font-size: 14px;"><p><br/></p><span style="font-size: inherit;vertical-align: baseline;"><b><b>4. Researching on language acquisition/teaching methodologies –</b></b>a)<b><b> </b></b></span><span style="font-size: 12px;">Through reading of academic journals</span></div><div style="font-size: 14px;"><span style="font-size: 12px;">b) Analysing data on questions</span></div><div style="font-size: 14px;"><span style="font-size: 12px;">c) By interacting with external subject experts</span></div><div style="font-size: 14px;"><span style="font-size: 12px;">d) By interacting with students and understanding how they think</span></div><div style="font-size: 14px;"><p><br/></p><strong style="font-size: inherit;vertical-align: baseline;"><b></b><b><b>Required Skills:</b></b></strong></div><div style="font-size: 14px;"><b><b>a) </b></b><span style="font-size: 12px;">3+ years of experience in content and team management/teaching role</span></div><div style="font-size: 14px;"><span style="font-size: 12px;">b) Ability to manage a team of 3-5 members</span></div><div style="font-size: 14px;"><span style="font-size: 12px;">c) Excellent written and oral communication skills</span></div><div style="font-size: 14px;"><span style="font-size: 12px;">d) Ability to create and source engaging assessments for students</span></div><div style="font-size: 14px;"><span style="font-size: 12px;">e) Ability to critically </span>analyse<span style="font-size: 12px;"> questions, tests, and projects for practical use in the context of the classroom</span></div><div style="font-size: 14px;"><span style="font-size: 12px;">f) Basic technological awareness (Windows functions, MS Office, email features)</span></div><div style="font-size: 14px;"><span style="font-size: 12px;">g) Sticking to tight schedules and effective workload management</span></div><div style="font-size: 14px;"><strong style="font-size: inherit;vertical-align: baseline;"><b></b><b><b><br/></b></b></strong></div><div style="font-size: 14px;"><strong style="font-size: inherit;vertical-align: baseline;"><b></b><b><b>Preferred Skills:</b></b></strong></div><div style="font-size: 14px;"><span style="font-size: 12px;">a) Subject background in Maths/Science, at a Masters’ level or above</span></div><div style="font-size: 14px;"><span style="font-size: 12px;">b) Ability to interact in a productive manner with teachers and students, if needed; this should be geared towards gleaning information that will help us improve our understanding of how students learn and also towards improving our offerings</span></div><div style="font-size: 14px;"><span style="font-size: 12px;">c) Should enjoy working in a team and across teams</span></div><div style="font-size: 14px;"><span style="font-size: 12px;">d) Should enjoy healthy debates and arguments which are critical for insight development</span></div><div style="font-size: 14px;"><p><br/></p><p>Job Location - Bangalore </p></div><p><br/></p>',
      min_experience: 3.0,
      max_experience: 8.0,
      job_category: "Full time",
      remark: "",
      job: 33,
      organization: 2
    },
    {
      createdAt: 1552960977178,
      updatedAt: 1552960977178,
      id: 42,
      job_title: "Curriculum Developer Hindi",
      functional_area:
        "Curriculum Developer / Content Writer/ Subject Matter Expert",
      min_salary: 5.0,
      max_salary: 10.0,
      is_salary_negotiable: true,
      job_location: "Gurgaon",
      job_description:
        '<p><br/></p><p style="font-size: 14px;">Currently, we have a job opening for <b><b></b><b><b></b></b><b><b></b><b><b>Curriculum Developer</b></b></b> Hindi </b>for Leading Education Company. </p><p style="font-size: 14px;"><br/></p><p style="font-size: 14px;"><b><b></b><b><b></b></b><b><b></b><b><b><span style="font-size: 10pt;color: black;">A Consulting Author will be responsible for the following:</span></b></b></b></b><b><b></b><b><b></b></b><b><b></b><b><b><span style="font-size: 10pt;"></span></b></b></b></b></p><p style="font-size: 14px;vertical-align: baseline;"><span style="font-size: 10pt;color: black;">The Consulting Author will work with the Academic Manager, Authors and Editors to improve the quality of learning programs and to ensure that all parts are completed on time. The Consulting Author will collaborate with the larger multi-disciplinary design team to review content and make product decisions.</span></p><p style="font-size: 14px;"><b><b></b><b><b></b></b><b><b></b><b><b><span style="font-size: 10pt;color: black;">Knowledge &amp; Experience</span></b></b></b></b></p><p style="font-size: 14px;"><span style="color: black;font-size: 10pt;"><b><b></b><b><b></b></b><b><b></b><b><b>1. </b></b></b></b>2+ years education experience</span></p><p style="font-size: 14px;"><span style="color: black;font-size: 10pt;">2. At least 1 year in classroom teaching in Grade 1-8 in the subject area applied for</span></p><p style="font-size: 14px;"><span style="color: black;font-size: 10pt;">3. Must have used experiential teaching methods in the classroom</span></p><p style="font-size: 14px;"><span style="color: black;font-size: 10pt;">4. At least </span>1-year<span style="color: black;font-size: 10pt;"> experience in a high-accountability workplace with targets and deadlines</span></p><p style="font-size: 14px;"><span style="color: black;font-size: 10pt;">5. Content/Curriculum writing/Publishing experience a plus</span></p><p style="font-size: 14px;"><b><b></b><b><b></b></b><b><b></b><b><b><span style="font-size: 10pt;color: black;">Skills</span></b></b></b></b></p><p style="font-size: 14px;text-align: justify;"><span style="font-size: 10pt;color: black;">The candidate will be able to:</span></p><p style="font-size: 14px;text-align: justify;"><span style="color: black;font-size: 10pt;">1. Research best practices/methods from multiple sources</span></p><p style="font-size: 14px;text-align: justify;"><span style="color: black;font-size: 10pt;">2. Write about technical, academic concepts clearly and concisely in a way understandable to teachers and children</span></p><p style="font-size: 14px;text-align: justify;"><span style="color: black;font-size: 10pt;">3. Develop detailed and age-appropriate Lesson Plans, Worksheets and Assessment tasks, and subject-specific content texts</span></p><p style="font-size: 14px;text-align: justify;"><span style="color: black;font-size: 10pt;">4. Use Microsoft Word and adhere to formatting standards</span></p><p><b style="font-size: 14px;"><b></b><b><b></b></b><b><b></b><b><b></b></b></b></b></p><div style="font-size: 14px;"><b><b></b><b><b></b></b><b><b></b><b><b><br/></b></b></b></b></div><p><span style="font-size: 14px;float: none;">Job Location - Gurgaon </span></p><p><br/></p>',
      min_experience: 3.0,
      max_experience: 8.0,
      job_category: "Full time",
      remark: "",
      job: 42,
      organization: 2
    },
    {
      createdAt: 1552960977367,
      updatedAt: 1552960977367,
      id: 50,
      job_title: "Program Success Manager (Teacher Trainer)",
      functional_area: "Teacher Trainer / Academic Consultant ",
      min_salary: 3.0,
      max_salary: 6.0,
      is_salary_negotiable: true,
      job_location: "Rajahmundry",
      job_description:
        '<p><br/></p><p class="hxl-job-title" style="font-size: 14px;"><b>Job Description</b></p><p style="font-size: 14px;"><b><b>We are looking candidate for Training profile for an education company. The company provides Books, Content, and curriculum to the schools. More than 1000 schools are using their content. </b></b></p><p style="font-size: 14px;"><b><b><br/></b></b></p><p style="font-size: 14px;"><b><b>Roles and Responsibilities</b></b><br/>Program Implementation and School Relationship:<br/><b><b>1. Relationship</b></b>: Manage the relationship with the designated schools within the territory in coordination with the ABM of that territory.<br/><b><b>2. Program Implementation and Communication:</b></b> Share the progress of program implementation in the School with the correspondent/owner during the school visits.<br/><b><b>3. Proactive problem solving–</b></b> Be transparent in sharing the feedback of the Schools and proactively resolve issues or queries of our clients in a timely manner.<br/><b><b>4. Escalate all issues concerning program implementation</b></b> to the Program Success central team<br/><b><b>5. Drive academic program –</b></b> Certain Academic programs shall be conducted from time to time and PSM shall be entrusted with the responsibility of driving the same effect at the School.</p><p style="font-size: 14px;"><br/><b><b>Lead Indicators of Improvement:</b></b><br/>1. Identify lead indicators of improvements at the School<br/>2. Gather evidence around lead indicators to strengthen the case for renewal and business growth</p><p style="font-size: 14px;"><br/><b><b>Training/Feedback</b></b><br/>1. Capture and share feedback received from schools to the product/content team which will help us to modify &amp; improve the product year to year.<br/>2. Be proactive in understanding every product offering in detail.<br/>3. Identify pain points of School and coordinate with central team for effective resolution<br/>4. Identify different category of customers and learn to deal with them during implementation</p><p style="font-size: 14px;"><br/><b><b>Business Development:</b></b><br/><b><b>1. School Retention and upgrade:</b></b> Retain existing schools and upgrade the value of business within the portfolio in coordination with the RBM/ABMs, by ensuring seamless implementation of the program and academic interventions.<br/><b><b>2. Pre-sales</b></b>: Support BD Team with pre-sales activity</p><p style="font-size: 14px;"><br/><b><b>Reporting and Documentation</b></b><br/><b><b>1. Documentation:</b></b> Adhere to the process laid down by the central team and complete all documentation within the stipulated timelines.<br/><b><b>2. Reporting:</b></b> Keep all reporting formats, documentation etc. updated on day-to-day basis.</p><p><br/></p>',
      min_experience: 3.0,
      max_experience: 8.0,
      job_category: "Full time",
      remark: "",
      job: 50,
      organization: 2
    },
    {
      createdAt: 1552960977570,
      updatedAt: 1552960977570,
      id: 60,
      job_title: "Business Development Manager  Regional Manager",
      functional_area: "Business Development",
      min_salary: 7.0,
      max_salary: 10.0,
      is_salary_negotiable: true,
      job_location: "Delhi/NCR",
      job_description:
        '<div style="font-size: 12.8px;">Responsible for establishing, maintaining and expanding base in the allocated zone to market the <b style="font-size: 12.8px;"><i>Talent Identification programme</i></b><span style="font-size: 12.8px;"> for students of grade 5th and above. </span><br/></div><div style="font-size: 12.8px;"><span style="font-size: 12.8px;">Develop competitive sales strategies for deeper market penetration. Responsible for executing the overall business plan, lead generation and meet revenue targets.</span></div><div style="font-size: 12.8px;">Prospecting, Identifying, &amp; generating new business and generating additional business from existing customer</div><div style="font-size: 12.8px;">Renew and expand the relationship with the schools at the end of every academic year.</div><div style="font-size: 12.8px;">Responsible for meeting revenue target and business goals for the organization.</div><div style="font-size: 12.8px;">Develop sales strategies &amp; set sales targets.</div><div style="font-size: 12.8px;">Develop network and relationships with Schools and also deal with dissatisfied customers and maintain the good relationship with all customers. </div><div style="font-size: 12.8px;">Maintain excellent rapport with school trustees and principals.</div><div style="font-size: 12.8px;"><br/></div><p><b>Qualification and Skills </b></p><div style="font-size: 12.8px;"><br/></div><div style="font-size: 12.8px;">Graduate; Post Graduate with minimum 3-5 years of experience in sales of online /offline educational product.</div><div style="font-size: 12.8px;">Familiar with the demography of Zone allotted. </div><div style="font-size: 12.8px;">Well versed in the current trends in the industry</div><div style="font-size: 12.8px;">Willing to travel</div><div style="font-size: 12.8px;">Ability to speak English and other languages.</div><p><br/></p><div style="font-size: 12.8px;">Desired Skill</div><div style="font-size: 12.8px;"><b>Systems-oriented individual.</b> Follow and stick to systems naturally and religiously. </div><div style="font-size: 12.8px;"><b>Proficiency in Microsoft </b>Word, Excel, PowerPoint, and Educational Software.</div><div style="font-size: 12.8px;">Possess strong written, verbal, and interpersonal communication skills</div><div style="font-size: 12.8px;"><span style="font-size: 13.5px;"><b>Customer Service:</b> </span><span style="font-size: 13.5px;">You might need to speak with dissatisfied customers or entertain high profile clients. </span><a title="customer service jobs" href="https://www.snagajob.com/job-search/q-customer+service" target="_blank" style="font-size: 13.5px;">Customer service</a><span style="font-size: 13.5px;"> skills will be necessary.</span></div><div style="font-size: 12.8px;"><span style="font-size: 13.5px;"><b>Communication Skills</b>: A big part of sales and leadership is communication. You will need to be a good listener and speaker, to help customers and employees understand your direction and recommendations</span></div><p><br/></p><p><br/></p>',
      min_experience: 3.0,
      max_experience: 5.0,
      job_category: "Full time",
      remark: "",
      job: 61,
      organization: 2
    },
    {
      createdAt: 1552960976470,
      updatedAt: 1552960976470,
      id: 15,
      job_title: "Curriculum Developer Science",
      functional_area: "Curriculum Developer/Subject Matter Expert",
      min_salary: 3.0,
      max_salary: 8.0,
      is_salary_negotiable: true,
      job_location: "Bangalore",
      job_description:
        '<p style="font-size: 14px;"><span style="font-size: 14px;float: none;">Currently, we have a job opening for Curriculum Developer Math with Leading Education Company. Its main mission to reach out to children everywhere to help them learn with understanding has created an online learning environment.</span></p><p style="font-size: 14px;"><strong style="font-size: inherit;vertical-align: baseline;"><b>1. Creating engaging content for the assessment, which includes </b></strong></p><p style="font-size: 14px;"><span style="font-size: 12px;">a) Sourcing suitable engrossing passages for reading and comprehension</span></p><p style="font-size: 14px;"><span style="font-size: 12px;">b) Creative ways of assessing comprehension, grammar and vocabulary</span></p><p style="font-size: 14px;"><strong style="font-size: inherit;vertical-align: baseline;"><b>2. Reviewing content, focusing on –</b></strong></p><p style="font-size: 14px;"><span style="font-size: 12px;">a) Quality of the question (concept tested, grade appropriateness, phrasing)</span></p><p style="font-size: 14px;"><span style="font-size: 12px;">b) Technical correctness</span></p><p style="font-size: 14px;"><span style="font-size: 12px;">c) Strength of the distractors</span></p><p style="font-size: 14px;"><span style="font-size: 12px;">d) Syntactical/semantic errors</span></p><p style="font-size: 14px;"><strong style="font-size: inherit;vertical-align: baseline;"><b>3. Researching on language acquisition/teaching methodologies –a) </b></strong><span style="font-size: 12px;">Through reading of academic journals</span></p><p style="font-size: 14px;"><span style="font-size: 12px;">b) Analysing data on questions</span></p><p style="font-size: 14px;"><span style="font-size: 12px;">c) By interacting with external subject experts</span></p><p style="font-size: 14px;"><span style="font-size: 12px;">d) By interacting with students and understanding how they think</span></p><p style="font-size: 14px;"><strong style="font-size: inherit;vertical-align: baseline;"><b>Required Skills:</b></strong></p><p style="font-size: 14px;"><span style="font-size: 12px;">a) 0-5 years of experience in content creation/teaching role</span></p><p style="font-size: 14px;"><span style="font-size: 12px;">b) Excellent written and oral communication skills</span></p><p style="font-size: 14px;"><span style="font-size: 12px;">c) </span><span style="font-size: 12px;">Ability to create and source engaging assessments for students</span></p><p style="font-size: 14px;"><span style="font-size: 12px;">d) Ability to critically analyse questions, tests, and projects for practical use in the context of the classroom</span></p><p style="font-size: 14px;"><span style="font-size: 12px;">e) Basic technological awareness (Windows functions, MS Office, email features)</span></p><p style="font-size: 14px;"><span style="font-size: 12px;">f) Sticking to tight schedules and effective workload management</span></p><p style="font-size: 14px;"><strong style="font-size: inherit;vertical-align: baseline;"><b>Preferred Skills:</b></strong></p><p><font color="#898989"><b>1. </b></font><span style="font-size: 12px;">Subject background in Maths/Science, at a Masters’ level or above</span></p><p><span style="font-size: 12px;">2. Ability to interact in a productive manner with teachers and students, if needed; this should be geared towards gleaning information that will help us improve our understanding of how students learn and also towards improving our offerings</span></p><p><span style="font-size: 12px;">3. Should enjoy working in a team and across teams</span></p><p><span style="font-size: 12px;">4. Should enjoy healthy debates and arguments which are critical for insight development</span></p><!--EndFragment--><div>Job Location - Bangalore </div><div><br/></div><p>Need some information from your side:-</p><div><br/></div><div>1. Current CTC:-</div><div>2. Expected CTC:-</div><div>3. Notice Period:-</div><div>4. Ready to relocate to Bangalore:- <br/><p></p><!--EndFragment--><br/><p><br/></p></div>',
      min_experience: 3.0,
      max_experience: 8.0,
      job_category: "Full time",
      remark: "",
      job: 15,
      organization: 2
    },
    {
      createdAt: 1552960976773,
      updatedAt: 1552960976773,
      id: 24,
      job_title: "Compensation and Benefits Manager",
      functional_area: "HR",
      min_salary: 10.0,
      max_salary: 15.0,
      is_salary_negotiable: true,
      job_location: "Noida",
      job_description:
        '<p><b id="docs-internal-guid-75e8abc3-d821-5b36-b08b-b4317f58dee0"></b></p><p dir="ltr" style="text-align: justify;background-color: #ffffff;"><span style="font-size: 10pt;color: #000000;background-color: transparent;vertical-align: baseline;">We are looking candidate for a Multinational Education Company for Noida Location for <b>Compensation and benefits Manager Role.</b> </span></p><p dir="ltr" style="text-align: justify;background-color: #ffffff;"><span style="font-size: 10pt;color: #000000;background-color: transparent;vertical-align: baseline;">The Company Founded in 1844, world’s learning company, with 35,000 employees across 70 countries worldwide. We have expertise in educational courseware and assessment, and a range of teaching and learning services powered by technology. Our mission is to help people make progress through access to better learning. We believe that learning opens up opportunities, creating fulfilling careers and better lives.  Our unique insight and world-class expertise come from our long history of working closely with teachers, learners, researchers, authors, and thought leaders. Our products and services are used by millions of teachers and learners around the world every day.</span></p><p><br/></p><p dir="ltr" style="text-align: justify;background-color: #ffffff;"><span style="font-size: 10pt;color: #000000;background-color: transparent;vertical-align: baseline;">We have organized around three key stages of learning - a) K-12, b) Higher education and test preparation and c) Vocational and professional education. Established in India since 1998, Company has introduced its wide range of products and services in educational institutes as well as directly to the learners. </span></p><p dir="ltr"><span style="font-size: 10pt;color: #000000;background-color: transparent;vertical-align: baseline;"> </span></p><p dir="ltr"><span style="font-size: 10pt;color: #000000;background-color: transparent;vertical-align: baseline;"><b>Purpose:</b></span></p><p dir="ltr"><span style="font-size: 10pt;color: #000000;background-color: transparent;vertical-align: baseline;">Reporting to the Regional Rewards, APAC, this position works along with Rewards Partner for Growth markets to provide compensation program design, review support, market analysis for adaptation of Global, Regional and Local Policies.</span></p><p dir="ltr"><span style="font-size: 10pt;color: #000000;background-color: transparent;vertical-align: baseline;"> </span></p><p dir="ltr"><span style="font-size: 10pt;color: #000000;background-color: transparent;vertical-align: baseline;"><b>Key Accountabilities &amp; Deliverables:</b></span></p><ul><li dir="ltr" style="font-size: 10pt;color: #000000;background-color: transparent;vertical-align: baseline;"><p dir="ltr"><span style="font-size: 10pt;color: #000000;background-color: transparent;vertical-align: baseline;">Interpret the directions and support Regional Reward partner on conducting analysis on internal and external salary statistics</span><span style="font-size: 12pt;color: #000000;background-color: transparent;vertical-align: baseline;"><br class="kix-line-break"/></span><span style="font-size: 10pt;color: #000000;background-color: transparent;vertical-align: baseline;">Devise enterprise-level plans and programs for Global Pearson under leadership of VP Reward Program, provide analysis support</span></p></li><li dir="ltr" style="font-size: 10pt;color: #000000;background-color: transparent;vertical-align: baseline;"><p dir="ltr"><span style="font-size: 10pt;color: #000000;background-color: transparent;vertical-align: baseline;">Provide support for the assessment, design, implementation as well as administration of compensation and rewards programs and policies across APAC regions.</span></p></li><li dir="ltr" style="font-size: 10pt;color: #000000;background-color: transparent;vertical-align: baseline;"><p dir="ltr"><span style="font-size: 10pt;color: #000000;background-color: transparent;vertical-align: baseline;">Evaluate jobs and determine their classification. Alongside assist in conducting studies for specific functional areas; through the analysis of market trends the completion of statistical reports and the development of recommendations and action plans to focus on employee attraction, retention, and awards</span></p></li><li dir="ltr" style="font-size: 10pt;color: #000000;background-color: transparent;vertical-align: baseline;"><p dir="ltr"><span style="font-size: 10pt;color: #000000;background-color: transparent;vertical-align: baseline;">Gather data and prepare survey submission for participation in various external salary compensation surveys</span></p></li><li dir="ltr" style="font-size: 12pt;color: #000000;background-color: transparent;vertical-align: baseline;"><p dir="ltr"><span style="font-size: 10pt;color: #000000;background-color: transparent;vertical-align: baseline;">Manage salary survey data into the Talent reward compensation system</span></p></li><li dir="ltr" style="font-size: 10pt;color: #000000;background-color: transparent;vertical-align: baseline;"><p dir="ltr"><span style="font-size: 10pt;color: #000000;background-color: transparent;vertical-align: baseline;">Understanding the patterns and market trends of compensation philosophies of competitors</span></p></li><li dir="ltr" style="font-size: 12pt;color: #000000;background-color: transparent;vertical-align: baseline;"><p dir="ltr"><span style="font-size: 10pt;color: #000000;background-color: transparent;vertical-align: baseline;">Partner on Regional and other Global projects as assigned</span><span style="font-size: 12pt;color: #000000;background-color: transparent;vertical-align: baseline;"><br class="kix-line-break"/></span><span style="font-size: 10pt;color: #000000;background-color: transparent;vertical-align: baseline;">Designs and maintains compensation and benefit dashboards. Assists in completing a variety of compensation and benefit data analyses, program usage and effectiveness reviews. Benefits analysis</span></p></li></ul><p><br/></p><p dir="ltr"><span style="font-size: 10pt;color: #000000;background-color: transparent;vertical-align: baseline;"><b>Competencies:</b></span></p><ul><li dir="ltr" style="font-size: 12pt;color: #000000;background-color: transparent;vertical-align: baseline;"><p dir="ltr"><span style="font-size: 10pt;color: #000000;background-color: transparent;vertical-align: baseline;">Excellent oral and written communication skills in English</span></p></li><li dir="ltr" style="font-size: 12pt;color: #000000;background-color: transparent;vertical-align: baseline;"><p dir="ltr"><span style="font-size: 10pt;color: #000000;background-color: transparent;vertical-align: baseline;">Data Mining, Data analysis, Number Crunching</span></p></li><li dir="ltr" style="font-size: 12pt;color: #000000;background-color: transparent;vertical-align: baseline;"><p dir="ltr"><span style="font-size: 10pt;color: #000000;background-color: transparent;vertical-align: baseline;">Engages in analytic and pragmatic problem-solving. Makes suggestions and provides information for innovative changes or improvements to the program</span></p></li><li dir="ltr" style="font-size: 12pt;color: #000000;background-color: transparent;vertical-align: baseline;"><p dir="ltr"><span style="font-size: 10pt;color: #000000;background-color: transparent;vertical-align: baseline;">Exhibits learning agility and active knowledge seeking along with a working knowledge of industry standards</span></p></li><li dir="ltr" style="font-size: 12pt;color: #000000;background-color: transparent;vertical-align: baseline;"><p dir="ltr"><span style="font-size: 10pt;color: #000000;background-color: transparent;vertical-align: baseline;">Excellent organization, time management, prioritization, and planning skills. Must be able to manage multiple projects and project components with inter-related asset and timing dependencies</span></p></li><li dir="ltr" style="font-size: 12pt;color: #000000;background-color: transparent;vertical-align: baseline;"><p dir="ltr"><span style="font-size: 10pt;color: #000000;background-color: transparent;vertical-align: baseline;">Highly active ownership</span></p></li><li dir="ltr" style="font-size: 12pt;color: #000000;background-color: transparent;vertical-align: baseline;"><p dir="ltr"><span style="font-size: 10pt;color: #000000;background-color: transparent;vertical-align: baseline;">Financial Management Skills</span></p></li></ul><p><br/></p><p><br/></p><p><b id="docs-internal-guid-75e8abc3-d826-d789-35d2-2a32f3cb6b39"></b></p><p dir="ltr"><span style="font-size: 10pt;color: #000000;background-color: transparent;vertical-align: baseline;"><b>Core Technical/Functional Competencies:</b></span></p><p dir="ltr"><span style="font-size: 10pt;color: #000000;background-color: transparent;vertical-align: baseline;"><b>Essential:</b></span><span style="font-size: 10pt;color: #000000;background-color: transparent;vertical-align: baseline;"> Proficient in Microsoft Office</span></p><p dir="ltr"><span style="font-size: 10pt;color: #000000;background-color: transparent;vertical-align: baseline;">Hu<span id="selectionBoundary_1511159959263_01924513759510349" class="rangySelectionBoundary">&#65279;</span>man Resources principles and best practices in compensation including job analysis/evaluation;</span></p><p dir="ltr"><span style="font-size: 10pt;color: #000000;background-color: transparent;vertical-align: baseline;"> </span></p><p dir="ltr"><span style="font-size: 10pt;color: #000000;background-color: transparent;vertical-align: baseline;"><b>Education, Qualifications &amp; Training</b></span></p><p dir="ltr"><span style="font-size: 10pt;color: #000000;background-color: transparent;vertical-align: baseline;">Any Post Graduates.( MBA with specialization in HR/PGDM</span><span style="font-size: 12pt;color: #000000;background-color: transparent;vertical-align: baseline;">)</span></p><p><br/></p><p dir="ltr"><span style="font-size: 10pt;color: #000000;background-color: transparent;vertical-align: baseline;"><b>Previous Experience</b></span><span style="font-size: 12pt;color: #000000;background-color: transparent;vertical-align: baseline;"><b>:</b> </span><span style="font-size: 10pt;color: #000000;background-color: transparent;vertical-align: baseline;">1 - 3 years of compensation analysis. Experience working with remote Regional and Global teams</span></p><p><br/></p><p><br/></p>',
      min_experience: 1.0,
      max_experience: 3.0,
      job_category: "Full time",
      remark: "",
      job: 24,
      organization: 2
    },
    {
      createdAt: 1552960977014,
      updatedAt: 1552960977014,
      id: 34,
      job_title: "Data Scientist",
      functional_area: "Data Scientist",
      min_salary: 6.0,
      max_salary: 12.0,
      is_salary_negotiable: true,
      job_location: "Bengaluru/Bangalore",
      job_description:
        '<p><span style="font-size: inherit;vertical-align: baseline;"><span style="font-size: 12.8px;float: none;">Currently, we have a job opening for the position of Data Scientist for Leading Education Company.</span><!--EndFragment--><br/></span></p><div><strong style="font-size: inherit;vertical-align: baseline;"><b><br/></b></strong></div><div><strong style="font-size: inherit;vertical-align: baseline;"><b>What you’ll be doing?</b></strong><br/></div><div><div><span style="font-size: 12px;">a) Support the design and implementation of continuous improvement levers through data analytics to improve the product</span></div><div><span style="font-size: 12px;">b) Dig </span>into<span style="font-size: 12px;"> the large data sets and develop analytical solutions that provide actionable insights on student learning that will support the product development team</span></div><div><span style="font-size: 12px;">c) Work cross-functionally and support </span>adhoc<span style="font-size: 12px;"> analyses to give a more structured shape, examine recent and historical data, identify salient trends, develop statistical models, and surface key insights</span></div><div><span style="font-size: 12px;">d) Synthesize diverse, complex information to develop a compelling story with data and insights</span></div><div><span style="font-size: 12px;"><font color="#898989"><br/></font></span><strong style="font-size: inherit;vertical-align: baseline;"><b>Skills/competencies required</b></strong></div><div><span style="font-size: 12px;">a) Must have an engineering degree from Tier -1 institutes preferably with coursework in operation research, statistics, machine learning or programming</span></div><div><span style="font-size: 12px;">b) 2 to 3 years of experience in analytics domain</span></div><div><span style="font-size: 12px;">c) Familiarity with machine learning models</span></div><div><span style="font-size: 12px;">d) Familiarity with significance testing, sampling, descriptive statistics, and multivariate statistics</span></div><div>e) Hands on<span style="font-size: 12px;"> experience with any statistical analysis environments such as R, Python, MATLAB, SPSS or SAS and comfortable with relational and non-relational databases</span></div><div><span style="font-size: 12px;">f) Proficient in Microsoft office</span></div><div><span style="font-size: 12px;"><font color="#898989"><br/></font></span><strong style="font-size: inherit;vertical-align: baseline;"><b>Who is a good fit?</b></strong></div><div><span style="font-size: 12px;">a) You are passionate about education and want to see a world where all the children get the opportunity to learn to the best of their ability</span></div><div><span style="font-size: 12px;">b) Curious about how learning happens and what can make learning better</span></div><div><span style="font-size: 12px;">c) Have experience in statistics/analytics</span></div><div><span style="font-size: 12px;">d) You want to work in an intellectually challenging environment with the freedom to pursue interesting problems</span></div><div><p><br/></p><strong style="font-size: inherit;vertical-align: baseline;"><b>What we have to offer?</b></strong></div><div><span style="font-size: 12px;">a) Opportunity to work with leading machine learning experts and education leaders</span></div><div><span style="font-size: 12px;">b) Flat organizational structure</span></div><div><span style="font-size: 12px;">c) Meritocracy-driven, candid culture</span></div><div><span style="font-size: 12px;">d) Very high visibility</span></div><div><p><br/></p><strong style="font-size: inherit;vertical-align: baseline;"><b>Location:</b></strong><span style="font-size: inherit;"> </span><span style="font-size: inherit;">Bangalore</span><br/><br/></div></div>',
      min_experience: 2.0,
      max_experience: 6.0,
      job_category: "Full time",
      remark: "",
      job: 35,
      organization: 2
    }
  ]
};
