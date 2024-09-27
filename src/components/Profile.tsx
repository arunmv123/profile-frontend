import React, { useState, useEffect } from "react";
import {
  getProfile,
  updateProfile,
  submitProfile,
} from "../services/authService";

interface Education {
  degree: string;
  institution: string;
}

interface WorkHistory {
  jobTitle: string;
  companyName: string;
  startDate: string;
  endDate: string;
}
interface Skill {
  skill: string;
}
interface ProfileData {
  name: string;
  address: string;
  phoneNumber: string;
  education: Education[];
  workHistory: WorkHistory[];
  skills: Skill[];
  profileCompletion: number;
  submitted: boolean;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    address: "",
    phoneNumber: "",
    education: [{ degree: "", institution: "" }],
    workHistory: [
      { jobTitle: "", companyName: "", startDate: "", endDate: "" },
    ],
    skills: [{ skill: "" }],
    profileCompletion: 0,
    submitted: false,
  });
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    // Fetch the user profile on component mount
    const fetchProfile = async () => {
      const response = await getProfile();
      if (!response.data) {
        setProfile({
          name: "",
          address: "",
          phoneNumber: "",
          education: [{ degree: "", institution: "" }],
          workHistory: [
            { jobTitle: "", companyName: "", startDate: "", endDate: "" },
          ],
          skills: [{ skill: "" }],
          profileCompletion: 0,
          submitted: false,
        });
      } else {
        setProfile(response.data);
      }
    };
    fetchProfile();
  }, []);

  // Handle input changes and update profile
  const handleChange = (field: keyof ProfileData, value: any) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
    updateCompletionPercentage();
  };

  const handleSubmitProfile = async () => {
    try {
      await submitProfile();
      alert("Thanking you for submitting the profile");
      window.location.reload();
    } catch (error: any) {
      alert(error.response.data.message || "Error during submission");
    }
  };

  // Handle array fields (Education, WorkHistory, Skills)
  const handleArrayChange = (
    field: keyof ProfileData,
    index: number,
    subfield: string,
    value: string
  ) => {
    const updatedArray = [...(profile[field] as any)];
    updatedArray[index][subfield] = value;
    setProfile({ ...profile, [field]: updatedArray });
    updateCompletionPercentage();
  };

  // Update the profile completion percentage
  const updateCompletionPercentage = () => {
    const totalFields = 10; // Total fields: 3 personal, 2 education, 4 work history, 1 skill
    let filledFields = 0;

    // Count filled fields for Personal Information
    if (profile.name) filledFields++;
    if (profile.address) filledFields++;
    if (profile.phoneNumber) filledFields++;

    // Count filled fields for Education
    profile.education.forEach((edu) => {
      if (edu.degree) filledFields++;
      if (edu.institution) filledFields++;
    });

    // Count filled fields for Work History
    profile.workHistory.forEach((work) => {
      if (work.jobTitle) filledFields++;
      if (work.companyName) filledFields++;
      if (work.startDate) filledFields++;
      if (work.endDate) filledFields++;
    });

    // Count filled fields for Skills
    if (profile.skills.length > 0 && profile.skills[0]) filledFields++;

    // Calculate completion percentage
    setCompletion((filledFields / totalFields) * 100);
  };

  const handleUpdateProfile = async (e: any) => {
    e.preventDefault();
    try {
      await updateProfile(profile);
      alert("Successfully updated");
      window.location.reload();
    } catch (error : any) {
      alert(error.response.data.message || "Error during updation");
    }
  };

  return (
    <div>
      <h2>Profile Management</h2>
      <form onSubmit={handleUpdateProfile}>
        {/* Personal Information Section */}
        <h3>Personal Information (30%)</h3>
        <input
          placeholder="Name"
          value={profile.name}
          required
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <input
          placeholder="Address"
          required
          value={profile.address}
          onChange={(e) => handleChange("address", e.target.value)}
        />
        <input
          placeholder="Phone Number"
          required
          type="tel"
          pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
          value={profile.phoneNumber}
          onChange={(e) => handleChange("phoneNumber", e.target.value)}
        />

        {/* Professional Information Section */}
        <h3>Professional Information (70%)</h3>

        {/* Education Section (25%) */}
        <h4>Education (25%)</h4>
        {profile?.education?.map((edu, index) => (
          <div key={index}>
            <input
              placeholder="Degree"
              required
              value={edu.degree}
              onChange={(e) =>
                handleArrayChange("education", index, "degree", e.target.value)
              }
              list="degrees" // Autocomplete list
            />
            <input
              placeholder="Institution"
              required
              value={edu.institution}
              onChange={(e) =>
                handleArrayChange(
                  "education",
                  index,
                  "institution",
                  e.target.value
                )
              }
              list="institutions"
            />
          </div>
        ))}

        {/* Work History Section (25%) */}
        <h4>Work History (25%)</h4>
        {profile?.workHistory?.map((work, index) => (
          <div key={index}>
            <input
              placeholder="Job Title"
              required
              value={work.jobTitle}
              onChange={(e) =>
                handleArrayChange(
                  "workHistory",
                  index,
                  "jobTitle",
                  e.target.value
                )
              }
            />
            <input
              placeholder="Company Name"
              required
              value={work.companyName}
              onChange={(e) =>
                handleArrayChange(
                  "workHistory",
                  index,
                  "companyName",
                  e.target.value
                )
              }
              list="companies"
            />
            <input
              placeholder="Start Date"
              type="date"
              value={work.startDate}
              onChange={(e) =>
                handleArrayChange(
                  "workHistory",
                  index,
                  "startDate",
                  e.target.value
                )
              }
            />
            <input
              placeholder="End Date"
              type="date"
              value={work.endDate}
              onChange={(e) =>
                handleArrayChange(
                  "workHistory",
                  index,
                  "endDate",
                  e.target.value
                )
              }
            />
          </div>
        ))}

        {/* Skills Section (20%) */}
        <h4>Skills (20%)</h4>
        {profile?.skills?.map((skill, index) => (
          <input
            key={index}
            placeholder="Skill"
            value={skill.skill}
            //onChange={(e) => handleSkillChange(index, e.target.value)}
            onChange={(e) =>
              handleArrayChange("skills", index, "skill", e.target.value)
            }
            list="skills"
          />
        ))}

        {/* Profile Completion */}
        <p>
          Profile Completion:{" "}
          {profile.profileCompletion > 0
            ? profile.profileCompletion
            : completion.toFixed(2)}
          %
        </p>

        <button type="submit" disabled={profile.profileCompletion === 100}>
          {"Update Profile"}
        </button>
        <button
          onClick={handleSubmitProfile}
          disabled={
            profile.submitted === true || profile.profileCompletion !== 100
          }
        >
          {"Submit Profile"}
        </button>
      </form>

      {/* Autocomplete Datalists */}
      <datalist id="degrees">
        <option value="Bachelor's" />
        <option value="Master's" />
        <option value="PhD" />
      </datalist>
      <datalist id="institutions">
        <option value="Harvard University" />
        <option value="MIT" />
        <option value="Stanford University" />
      </datalist>
      <datalist id="companies">
        <option value="Google" />
        <option value="Apple" />
        <option value="Microsoft" />
      </datalist>
      <datalist id="skills">
        <option value="JavaScript" />
        <option value="React" />
        <option value="Node.js" />
      </datalist>
    </div>
  );
};

export default Profile;
