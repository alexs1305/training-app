// MODULE 4 — Implement Computer Vision Solutions (10-15%)
export default {
  id: 4,
  title: "Computer Vision Solutions",
  description: "Image analysis, custom models, OCR, and video analysis (10–15%)",
  lessons: [
    {
      title: "Image Analysis with Azure AI Vision",
      questions: [
        {
          question: "When making an image analysis request to Azure Vision in Foundry Tools, you want to receive objects detected in the image AND a generated caption. Which visual features should you include in the request?",
          answers: [
            "Tags and Description",
            "Objects and Caption",
            "Categories and Faces",
            "Read and SmartCrops"
          ],
          correct: 1,
          explanation: "Azure Vision's Image Analysis 4.0 API supports specifying visual features. 'Objects' returns bounding boxes and labels for detected objects; 'Caption' returns a human-readable description. Both can be requested in a single API call."
        },
        {
          question: "You call the Azure AI Vision Read API on an image and receive the following response structure: pages > lines > words. What does each 'word' object contain?",
          answers: [
            "Only the recognized text string",
            "The recognized text string, confidence score, and bounding polygon coordinates",
            "A URL to the cropped word image",
            "The font family and size detected"
          ],
          correct: 1,
          explanation: "Each word object in the Read API response contains the recognized text content, a confidence score (0-1), and a bounding polygon that specifies the exact location of the word on the image/page."
        },
        {
          question: "A retail application needs to analyze security camera footage to count the number of people present in a zone at any given time. Which Azure AI Vision feature supports this?",
          answers: [
            "Image Analysis object detection",
            "Azure AI Video Indexer face identification",
            "Azure Vision in Foundry Tools Spatial Analysis",
            "Custom Vision people-counting model"
          ],
          correct: 2,
          explanation: "Spatial Analysis (part of Azure Vision in Foundry Tools) is designed for real-time people detection and movement tracking in live video streams, including zone-based occupancy counting and social distancing monitoring."
        }
      ],
      variantQuestions: [
        {
          question: "A developer wants a single Azure Vision API call to return both a list of detected objects with bounding boxes and a natural language caption of the scene. Which two visual features should they specify?",
          answers: [
            "Tags and Faces",
            "Objects and Caption",
            "Read and SmartCrops",
            "Categories and Description"
          ],
          correct: 1,
          explanation: "Azure Vision Image Analysis 4.0 supports requesting multiple visual features in one call. 'Objects' returns detected objects with bounding boxes; 'Caption' returns a generated natural language description of the image."
        },
        {
          question: "A shopping centre security team needs to monitor live CCTV feeds and alert staff when more than 50 people are present in a restricted area. Which Azure AI Vision capability is purpose-built for this?",
          answers: [
            "Custom Vision object detection model trained on crowd images",
            "Azure AI Video Indexer for post-recording analysis",
            "Spatial Analysis for real-time people detection and zone occupancy in video streams",
            "Image Analysis batch processing on captured frames"
          ],
          correct: 2,
          explanation: "Spatial Analysis is specifically designed for real-time video stream analysis, including zone-based people counting and movement tracking. Unlike batch or post-hoc analysis tools, it operates on live feeds."
        }
      ]
    },
    {
      title: "Custom Vision Models",
      questions: [
        {
          question: "You are building a custom image classification model to distinguish between 5 product categories. After training, the model shows 95% precision but only 60% recall for one category. What does this indicate?",
          answers: [
            "The model frequently misclassifies other categories as this category",
            "The model correctly identifies this category when it predicts it, but misses many true instances of this category",
            "The model never predicts this category",
            "The training data for this category was not uploaded"
          ],
          correct: 1,
          explanation: "High precision (95%) means when the model predicts this category, it is usually right. Low recall (60%) means the model is missing 40% of true instances of this category — those are false negatives. This often indicates insufficient or unvaried training images for that class."
        },
        {
          question: "What is the minimum recommended number of labeled images per tag when training a Custom Vision classification model?",
          answers: [
            "5 images",
            "15 images",
            "50 images",
            "200 images"
          ],
          correct: 1,
          explanation: "Microsoft recommends at least 15 images per tag to train a Custom Vision model, with 50+ for production quality. The images should be varied in angle, lighting, background, and scale to improve model generalization."
        },
        {
          question: "After training and evaluating a Custom Vision model, what step is required before a client application can call it via API?",
          answers: [
            "Export the model to ONNX format",
            "Publish the iteration to a prediction resource endpoint",
            "Download the model weights and host them yourself",
            "Approve the model in the Azure portal compliance dashboard"
          ],
          correct: 1,
          explanation: "A trained Custom Vision model iteration must be published to a prediction resource before it exposes an API endpoint. Publishing makes the model available via the Prediction API URL with the prediction key."
        },
        {
          question: "You want to build a custom object detection model entirely through code (no portal) using the Custom Vision SDK. Which SDK operations are required in order?",
          answers: [
            "Create project → Upload and tag images → Train model → Publish iteration → Call prediction API",
            "Create project → Publish iteration → Upload images → Train model",
            "Upload images → Tag images → Deploy model → Create project",
            "Fine-tune a base model → Export → Deploy"
          ],
          correct: 0,
          explanation: "The code-first Custom Vision workflow requires: (1) create a project with object detection type, (2) upload and tag images with regions, (3) trigger training, (4) publish the trained iteration, (5) use the prediction endpoint."
        }
      ],
      variantQuestions: [
        {
          question: "Your Custom Vision classification model achieves 92% precision but only 58% recall for the 'damaged' product category. What does the low recall tell you?",
          answers: [
            "The model over-predicts 'damaged' — too many false positives",
            "The model misses many genuinely damaged products — high false negatives for that class",
            "The 'damaged' class was excluded from the training dataset",
            "The model has too many training images for this class"
          ],
          correct: 1,
          explanation: "Recall measures the proportion of actual positives correctly identified. Low recall (58%) means the model is missing 42% of truly damaged products (false negatives), even though when it does predict 'damaged' it is usually right (high precision)."
        },
        {
          question: "After training a Custom Vision model, a developer calls the Prediction API endpoint but receives an HTTP 404 error. Which step was most likely skipped?",
          answers: [
            "The model was not exported to ONNX format before deployment",
            "The trained iteration was not published to a prediction resource endpoint",
            "The training images were uploaded in an unsupported format",
            "The confidence threshold was not set in the portal"
          ],
          correct: 1,
          explanation: "A trained Custom Vision iteration must be explicitly published to a prediction resource. Without publishing, no prediction endpoint URL exists, resulting in a 404 when attempting to call the API."
        }
      ]
    },
    {
      title: "Azure AI Face Service",
      questions: [
        {
          question: "A security system needs to determine whether a face captured by a camera belongs to one of 200 registered employees. Which Azure AI Face operation enables this?",
          answers: [
            "Face detection — returns bounding boxes and face IDs only",
            "Face identification — matches a detected face against a PersonGroup of known people",
            "Face verification — performs a 1:1 comparison between two specific face images",
            "Face grouping — clusters visually similar faces together"
          ],
          correct: 1,
          explanation: "Face identification performs a 1:N comparison, matching a detected face against all persons enrolled in a PersonGroup (or LargePersonGroup) and returning the most likely match with a confidence score. Verification is 1:1; identification is 1:N."
        },
        {
          question: "What is liveness detection in Azure AI Face, and why is it important for authentication scenarios?",
          answers: [
            "It checks whether the image resolution is sufficient for accurate recognition",
            "It determines whether the face is from a real person physically present rather than a photo, video, or mask replay",
            "It validates that the Azure Face endpoint is reachable before processing requests",
            "It confirms that the detected face matches a live record in the enrolled database"
          ],
          correct: 1,
          explanation: "Liveness detection (anti-spoofing) verifies that the face captured is from a live person physically present — not a photograph, video replay, or synthetic mask. It is a critical security layer for face-based authentication to prevent presentation attacks."
        },
        {
          question: "A developer calls the Azure AI Face Detect API and wants to determine whether the detected person is wearing glasses. What must they include in the API request?",
          answers: [
            "The returnFaceId parameter set to true",
            "The returnFaceAttributes parameter specifying 'glasses' (and any other desired attributes)",
            "A separate call to a dedicated FaceAttribute API after detection",
            "A custom vision model trained on eyewear classification"
          ],
          correct: 1,
          explanation: "The Face Detect API only returns face attributes when you explicitly request them via the returnFaceAttributes parameter. Supported attributes include glasses, age estimation, head pose, blur, exposure, occlusion, and mask. Without this parameter, only bounding box and optional face IDs are returned."
        },
        {
          question: "An e-commerce site wants to verify that a selfie taken during login matches the ID photo submitted during account registration. Which Azure AI Face operation performs this 1:1 comparison?",
          answers: [
            "Face identification against a PersonGroup containing the user's enrolled face",
            "Face verification, which compares two face images and returns whether they depict the same person",
            "Liveness detection, which confirms the selfie is from a real person",
            "Face grouping, which clusters similar faces to find a match"
          ],
          correct: 1,
          explanation: "Face verification performs a 1:1 comparison between two face images and returns a confidence score indicating whether they depict the same individual. For comparing a selfie against a specific stored ID photo, verification is the correct and most efficient operation."
        }
      ],
      variantQuestions: [
        {
          question: "A hotel check-in kiosk uses Azure AI Face to recognize VIP guests. An attacker attempts to authenticate using a printed photograph of a VIP. Which Azure AI Face capability is designed to prevent this attack?",
          answers: [
            "Face identification with a high confidence threshold to reject low-confidence matches",
            "Liveness detection, which determines whether the face is from a real live person or a presentation attack",
            "Face verification comparing the photo against the enrolled face ID",
            "returnFaceAttributes with blur and exposure checks to reject low-quality images"
          ],
          correct: 1,
          explanation: "Liveness detection detects presentation attacks such as printed photographs, video replays, and masks. It verifies that the face comes from a physically present live person — a check that confidence thresholds or quality filters cannot provide."
        },
        {
          question: "You have enrolled 500 employees into a PersonGroup and trained it. You now need to confirm whether a captured face belongs specifically to employee ID 42, without checking all other employees. Which Face API operation is most efficient?",
          answers: [
            "Face identification against the full PersonGroup — it returns the best match automatically",
            "Face verification between the captured face and a stored face from employee 42's enrollment",
            "Face grouping to cluster the captured face with similar faces in the PersonGroup",
            "Face detection with returnFaceAttributes to compare metadata with employee 42's profile"
          ],
          correct: 1,
          explanation: "Face verification performs a direct 1:1 comparison between a captured face and a specific known face. When you already know which person to check against, verification is more targeted and efficient than identification, which evaluates all persons in the group."
        },
        {
          question: "After calling the Azure AI Face Detect API, the response contains a 'faceId' but no attribute data such as age or glasses. What is the most likely reason?",
          answers: [
            "The image was too small for attribute analysis",
            "The returnFaceAttributes parameter was not specified in the request",
            "Attribute detection requires a separate Face Analyze API call",
            "Attribute data is only available in the Azure Government cloud region"
          ],
          correct: 1,
          explanation: "Face attributes (age, glasses, emotion, head pose, blur, etc.) are only returned when you explicitly include the returnFaceAttributes parameter in the Detect request. Without it, the API returns only bounding boxes and face IDs."
        }
      ]
    },
    {
      title: "Video Analysis",
      questions: [
        {
          question: "A media company wants to automatically generate transcripts, identify key topics, and detect speakers from uploaded video content. Which Azure service is best suited for this?",
          answers: [
            "Azure AI Vision Spatial Analysis",
            "Azure Media Services",
            "Azure AI Video Indexer",
            "Azure AI Speech batch transcription"
          ],
          correct: 2,
          explanation: "Azure AI Video Indexer provides comprehensive video insights including automatic transcription, speaker identification, topic detection, face detection, OCR, sentiment analysis, and keyframe extraction — all without custom model training."
        },
        {
          question: "When using Azure AI Video Indexer, how do you retrieve the insights generated from an indexed video?",
          answers: [
            "Download a PDF report from the portal",
            "Call the Video Indexer REST API with the video ID to get the JSON insights",
            "Subscribe to an Azure Event Grid event",
            "Query an automatically created Azure AI Search index"
          ],
          correct: 1,
          explanation: "After a video is indexed, you call the Video Indexer REST API (GET /Videos/{videoId}/Index) with the account ID and access token to retrieve the full JSON insights object containing all extracted metadata."
        }
      ],
      variantQuestions: [
        {
          question: "A media production company wants to automatically generate speaker-labeled transcripts, extract key topics, and detect scene changes from thousands of uploaded video files. Which Azure service provides all of these capabilities without custom model training?",
          answers: [
            "Azure AI Speech batch transcription (transcription only, no video insights)",
            "Azure AI Video Indexer (comprehensive video AI insights out of the box)",
            "Azure Media Services with a custom processing pipeline",
            "Azure AI Language text analytics applied to manually extracted frames"
          ],
          correct: 1,
          explanation: "Azure AI Video Indexer provides comprehensive, built-in video insights including speech-to-text, speaker identification, topic detection, face detection, OCR, sentiment analysis, and keyframe extraction — all without custom training."
        },
        {
          question: "After Azure AI Video Indexer finishes processing a video, a developer needs to programmatically extract the list of identified speakers and their spoken segments. How should they retrieve this data?",
          answers: [
            "Download the auto-generated PDF transcript from the portal",
            "Call the Video Indexer REST API with the video ID to retrieve the full JSON insights",
            "Subscribe to an Azure Event Grid topic that emits speaker segments",
            "Query the Azure AI Search index automatically created during indexing"
          ],
          correct: 1,
          explanation: "Video insights are retrieved via the Video Indexer REST API (GET /Videos/{videoId}/Index). The response is a comprehensive JSON object containing all extracted metadata including speakers, topics, transcripts, and sentiment."
        }
      ]
    }
  ]
}
