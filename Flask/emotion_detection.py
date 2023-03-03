import cv2
from deepface import DeepFace
import random

cap = cv2.VideoCapture(0)
font = cv2.FONT_HERSHEY_SIMPLEX
emotions = ['happy', 'sad', 'surprise', 'angry', 'neutral', 'fear', 'disgust']
success_msg = "Success! You performed all emotions correctly."
failure_msg = "Sorry, wrong emotion. Please try again."
text_size = cv2.getTextSize(success_msg, font, 1, 2)[0]

# Define a set to keep track of the emotions the user has performed correctly
performed_emotions = set()

while len(performed_emotions) < len(emotions):
    # Generate a random emotion that the user has not performed correctly yet
    random_emotion = random.choice(list(set(emotions) - performed_emotions))

    while True:
        ret, frame = cap.read()
        if not ret:
            break
        frame = cv2.flip(frame, 1)

        # Display the random emotion on the screen
        text = f"Perform {random_emotion}"
        text_size = cv2.getTextSize(text, font, 1, 2)[0]
        cv2.putText(frame, text, (10, frame.shape[0] - 10), font, 1, (0, 255, 0), 2, cv2.LINE_AA)

        # Use DeepFace to analyze the user's emotion
        result = DeepFace.analyze(frame, actions=['emotion'])
        emotion = result[0]['dominant_emotion']

        # Check if the analyzed emotion matches the displayed emotion
        if emotion.lower() == random_emotion.lower():
            # Add the emotion to the set of performed emotions
            performed_emotions.add(random_emotion)
            break
        else:
            # Display failure message if the emotions don't match
            text = failure_msg
            cv2.putText(frame, text, (10, frame.shape[0] - 10 - text_size[1] - 10), font, 1, (0, 0, 255), 2, cv2.LINE_AA)

        cv2.imshow('Emotion Detection', frame)

        if cv2.waitKey(1) == ord('q'):
            break

cap.release()
cv2.destroyAllWindows()

# Print success message if all emotions have been performed correctly
print(success_msg)
