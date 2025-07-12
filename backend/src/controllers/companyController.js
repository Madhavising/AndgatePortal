const CompanyModel = require("../models/company");

exports.createCompany = async (req, res) => {
    try {
        const { organization, email, phone, address, website, industry } = req.body;

        if (!organization || !email || !phone || !address) {
            return res.status(400).json({
                status: false,
                message: "Please provide all required fields: organization, email, phone, address",
            });
        }

        const existingCompany = await CompanyModel.findOne({ email });
        if (existingCompany) {
            return res.status(409).json({
                status: false,
                message: "Company with this email already exists.",
            });
        }

        const newCompany = new CompanyModel({
            organization,
            email,
            phone,
            address,
            website,
            industry,
        });

        const savedCompany = await newCompany.save();

        return res.status(200).json({
            status: true,
            message: "Company created successfully",
            data: savedCompany,
        });
    } catch (error) {
        console.error("Error adding company:", error);

        return res.status(500).json({
            status: false,
            message: "Failed to add company.",
            error: error.message,
        });
    }
};

exports.getCompanyById = async (req, res) => {
    const { companyId } = req.params;

    try {
        const company = await CompanyModel.findById(companyId);
        if (!company) {
            return res.status(404).json({
                status: false,
                message: "Company not found",
            });
        }
        return res.status(200).json({
            status: true,
            data: company,
        });
    } catch (error) {
        console.error("Error fetching company:", error);
        return res.status(500).json({
            status: false,
            message: "Failed to fetch company.",
            error: error.message,
        });
    }
};

exports.getAllOrganizations = async (req, res) => {
    try {
        const companies = await CompanyModel.find(
            {},
            { organization: 1, email: 1, phone: 1, address: 1, website: 1, industry: 1, _id: 1 }
        ).lean();

        if (!companies || companies.length === 0) {
            return res.status(404).json({
                status: false,
                message: "No companies found",
            });
        }

        return res.status(200).json({
            status: true,
            data: companies,
        });
    } catch (error) {
        console.error("Error fetching companies:", error);
        return res.status(500).json({
            status: false,
            message: "Failed to fetch companies.",
            error: error.message,
        });
    }
};