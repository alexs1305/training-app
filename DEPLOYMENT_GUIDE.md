# Deployment Guide: Azure AI Trainer

This guide will walk you through setting up a GitHub repository and deploying to Azure Static Web Apps.

## 📋 Prerequisites

- GitHub account
- Azure subscription
- Git installed on your computer
- Azure CLI (optional, but recommended)

---

## Part 1: Create GitHub Repository

### Step 1: Create a New Repository on GitHub

1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Fill in the details:
   - **Repository name**: `azure-ai-trainer` (or your preferred name)
   - **Description**: "Duolingo-style training app for Azure AI certification"
   - **Visibility**: Public (or Private if you prefer)
   - **DO NOT** initialize with README (we already have one)
4. Click **"Create repository"**

### Step 2: Push Your Code to GitHub

Open your terminal/command prompt and run these commands:

```bash
# Navigate to your project directory
cd /path/to/your/project

# Initialize git repository
git init

# Add all files
git add .

# Commit the files
git commit -m "Initial commit: Azure AI Trainer app"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR-USERNAME/azure-ai-trainer.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

---

## Part 2: Deploy to Azure Static Web Apps

### Option A: Using Azure Portal (Easiest)

#### Step 1: Create Static Web App Resource

1. Log in to [Azure Portal](https://portal.azure.com)
2. Click **"Create a resource"**
3. Search for **"Static Web Apps"**
4. Click **"Create"**

#### Step 2: Configure Basic Settings

**Basics tab:**
- **Subscription**: Select your Azure subscription
- **Resource Group**: Create new or select existing (e.g., `rg-azure-ai-trainer`)
- **Name**: `azure-ai-trainer` (this will be part of your URL)
- **Plan type**: **Free** (perfect for this app)
- **Region**: Choose closest to you (e.g., West US 2, East US 2)

#### Step 3: Configure Deployment

**Deployment details:**
- **Source**: Select **GitHub**
- Click **"Sign in with GitHub"** and authorize Azure
- **Organization**: Select your GitHub username
- **Repository**: Select `azure-ai-trainer`
- **Branch**: `main`

**Build Details:**
- **Build Presets**: Select **"Custom"**
- **App location**: `/` (root)
- **Api location**: Leave blank
- **Output location**: Leave blank

#### Step 4: Review and Create

1. Click **"Review + create"**
2. Review your settings
3. Click **"Create"**

Azure will now:
- Create the Static Web App resource
- Add a GitHub Action to your repository
- Automatically deploy your app

#### Step 5: Get Your URL

1. Once deployment completes, go to your Static Web App resource
2. Click **"Overview"**
3. Copy the **URL** (e.g., `https://happy-beach-123abc.azurestaticapps.net`)
4. Visit the URL to see your app live! 🎉

---

### Option B: Using Azure CLI (Advanced)

#### Step 1: Install Azure CLI

If not already installed:
- **Windows**: Download from [Microsoft Docs](https://aka.ms/installazurecliwindows)
- **Mac**: `brew install azure-cli`
- **Linux**: Follow [official guide](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli-linux)

#### Step 2: Login to Azure

```bash
az login
```

#### Step 3: Create Resource Group

```bash
az group create \
  --name rg-azure-ai-trainer \
  --location eastus2
```

#### Step 4: Create Static Web App

```bash
az staticwebapp create \
  --name azure-ai-trainer \
  --resource-group rg-azure-ai-trainer \
  --source https://github.com/YOUR-USERNAME/azure-ai-trainer \
  --location eastus2 \
  --branch main \
  --app-location "/" \
  --login-with-github
```

Replace `YOUR-USERNAME` with your GitHub username.

#### Step 5: Get the URL

```bash
az staticwebapp show \
  --name azure-ai-trainer \
  --resource-group rg-azure-ai-trainer \
  --query "defaultHostname" \
  --output tsv
```

---

## Part 3: Verify Deployment

### Check GitHub Actions

1. Go to your GitHub repository
2. Click the **"Actions"** tab
3. You should see a workflow running (Azure Static Web Apps CI/CD)
4. Wait for it to complete (green checkmark)

### Test Your App

1. Visit your Azure Static Web App URL
2. Test the functionality:
   - ✅ Lessons load correctly
   - ✅ Quiz works
   - ✅ Streak counter works
   - ✅ Progress saves to localStorage

---

## Part 4: Custom Domain (Optional)

### Add Custom Domain

1. Go to your Static Web App in Azure Portal
2. Click **"Custom domains"** in the left menu
3. Click **"+ Add"**
4. Select **"Custom domain on other DNS"**
5. Enter your domain (e.g., `azure-ai-trainer.com`)
6. Add the required DNS records to your domain provider:
   - **TXT record** for validation
   - **CNAME record** to point to your Static Web App
7. Click **"Add"**

It may take a few minutes for DNS changes to propagate.

---

## Part 5: Automatic Updates

Every time you push to the `main` branch, GitHub Actions will automatically:
1. Build your app
2. Deploy to Azure
3. Update the live site

### To Update Your App:

```bash
# Make changes to your files
# Then:
git add .
git commit -m "Update: description of your changes"
git push origin main
```

Wait 1-2 minutes and your changes will be live!

---

## 🔧 Troubleshooting

### Build Fails
- Check GitHub Actions logs
- Ensure all files are committed
- Verify staticwebapp.config.json is valid JSON

### App Not Loading
- Clear browser cache
- Check Azure Static Web App logs in Azure Portal
- Verify deployment succeeded in GitHub Actions

### Progress Not Saving
- Check browser console for localStorage errors
- Ensure you're not in private/incognito mode

---

## 💰 Cost Estimate

**Azure Static Web Apps (Free tier):**
- ✅ 100 GB bandwidth per month
- ✅ 0.5 GB storage
- ✅ Custom domains with free SSL
- ✅ **$0/month** for this app!

Perfect for learning projects and portfolios.

---

## 📚 Additional Resources

- [Azure Static Web Apps Documentation](https://learn.microsoft.com/en-us/azure/static-web-apps/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Custom Domains Guide](https://learn.microsoft.com/en-us/azure/static-web-apps/custom-domain)

---

## 🎉 Next Steps

1. Update the README.md with your actual URL
2. Share your app with fellow Azure AI learners
3. Add more questions and modules
4. Consider adding analytics (Azure Application Insights)
5. Add PWA features for offline support

**Congratulations! Your Azure AI Trainer is now live! 🚀**
