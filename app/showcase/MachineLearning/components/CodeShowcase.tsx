"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from '@/components/ui/badge'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'

export function CodeShowcase() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Code Examples</h2>
        <p className="text-muted-foreground">
          These code examples showcase key implementations from the Machine Learning Specialization,
          demonstrating practical applications of machine learning concepts.
        </p>
      </div>

      <Tabs defaultValue="regression" className="mb-8">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="regression">Regression</TabsTrigger>
          <TabsTrigger value="classification">Classification</TabsTrigger>
          <TabsTrigger value="neural-networks">Neural Networks</TabsTrigger>
          <TabsTrigger value="reinforcement">Reinforcement Learning</TabsTrigger>
        </TabsList>
        
        <TabsContent value="regression">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Linear Regression Implementation</CardTitle>
                <CardDescription>
                  Complete implementation of linear regression using gradient descent optimization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-secondary/20 p-4 rounded-md">
                    <h4 className="font-medium mb-2">1. Computing the Cost Function</h4>
                    <div className="rounded-md overflow-hidden">
                      <SyntaxHighlighter
                        language="python"
                        style={vscDarkPlus}
                        customStyle={{ margin: 0, borderRadius: '0.375rem' }}
                        wrapLines={true}
                      >
{`import numpy as np
import matplotlib.pyplot as plt

def compute_cost(x, y, w, b):
    """
    Computes the cost function for linear regression.
    
    Args:
        x (ndarray): Shape (m,) Input to the model (Population of cities) 
        y (ndarray): Shape (m,) Label (Actual profits of cities)
        w, b (scalar): Parameters of the model
    
    Returns
        total_cost (float): The cost of using w,b as the parameters for linear regression
    """
    # Number of training examples
    m = x.shape[0] 
    
    # Calculate cost
    total_cost = 0
    for i in range(m):
        f_wb = w * x[i] + b
        cost = (f_wb - y[i]) ** 2
        total_cost += cost
    total_cost = total_cost / (2 * m)
    
    return total_cost`}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                  
                  <div className="bg-secondary/20 p-4 rounded-md">
                    <h4 className="font-medium mb-2">2. Computing the Gradient</h4>
                    <div className="rounded-md overflow-hidden">
                      <SyntaxHighlighter
                        language="python"
                        style={vscDarkPlus}
                        customStyle={{ margin: 0, borderRadius: '0.375rem' }}
                        wrapLines={true}
                      >
{`def compute_gradient(x, y, w, b): 
    """
    Computes the gradient for linear regression 
    Args:
      x (ndarray): Shape (m,) Input to the model (Population of cities) 
      y (ndarray): Shape (m,) Label (Actual profits of cities)
      w, b (scalar): Parameters of the model  
    Returns
      dj_dw (scalar): The gradient of the cost w.r.t. the parameter w
      dj_db (scalar): The gradient of the cost w.r.t. the parameter b     
    """
    
    # Number of training examples
    m = x.shape[0]
    
    # Initialize gradients
    dj_dw = 0
    dj_db = 0
    
    # Compute the gradients
    for i in range(m):
        f_wb = w * x[i] + b
        dj_dw_i = (f_wb - y[i]) * x[i]
        dj_db_i = f_wb - y[i]
        
        dj_dw += dj_dw_i
        dj_db += dj_db_i
    
    # Average the gradients
    dj_dw = dj_dw / m
    dj_db = dj_db / m
    
    return dj_dw, dj_db`}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                  
                  <div className="bg-secondary/20 p-4 rounded-md">
                    <h4 className="font-medium mb-2">3. Gradient Descent Algorithm</h4>
                    <div className="rounded-md overflow-hidden">
                      <SyntaxHighlighter
                        language="python"
                        style={vscDarkPlus}
                        customStyle={{ margin: 0, borderRadius: '0.375rem' }}
                        wrapLines={true}
                      >
{`def gradient_descent(x, y, w_init, b_init, alpha, num_iters, compute_cost, compute_gradient):
    """
    Performs gradient descent to fit w,b. Updates w,b by taking 
    num_iters gradient steps with learning rate alpha
    
    Args:
      x (ndarray): Shape (m,) Input to the model (Population of cities) 
      y (ndarray): Shape (m,) Label (Actual profits of cities)
      w_init, b_init (scalar): Initial values for parameters w, b
      alpha (float): Learning rate
      num_iters (int): Number of iterations to run gradient descent
      compute_cost: Function to compute cost
      compute_gradient: Function to compute gradient
      
    Returns:
      w (scalar): Updated value of w after running gradient descent
      b (scalar): Updated value of b after running gradient descent
      J_history (list): History of cost values
      p_history (list): History of parameters [w,b] 
    """
    
    # Initialize parameters and history arrays
    w = w_init
    b = b_init
    J_history = []
    p_history = []
    
    for i in range(num_iters):
        # Calculate gradient and update parameters
        dj_dw, dj_db = compute_gradient(x, y, w, b)
        
        # Update parameters using gradient descent update
        w = w - alpha * dj_dw
        b = b - alpha * dj_db
        
        # Save cost and parameters at each iteration
        if i < 100000:  # prevent resource exhaustion
            J_history.append(compute_cost(x, y, w, b))
            p_history.append([w, b])
            
        # Print cost every at intervals
        if i % (num_iters // 10) == 0:
            print(f"Iteration {i:4d}: Cost {J_history[-1]:0.2e}")
            
    return w, b, J_history, p_history`}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                  
                  <div className="bg-secondary/20 p-4 rounded-md">
                    <h4 className="font-medium mb-2">4. Running Gradient Descent with Visualization</h4>
                    <div className="rounded-md overflow-hidden">
                      <SyntaxHighlighter
                        language="python"
                        style={vscDarkPlus}
                        customStyle={{ margin: 0, borderRadius: '0.375rem' }}
                        wrapLines={true}
                      >
{`# Initialize data
x_train = np.array([1.0, 2.0, 3.0, 4.0, 5.0])
y_train = np.array([300.0, 500.0, 700.0, 900.0, 1100.0])

# Initialize parameters
initial_w = 0
initial_b = 0
iterations = 1000
alpha = 1.0e-2

# Run gradient descent
w_final, b_final, J_hist, p_hist = gradient_descent(
    x_train, y_train, initial_w, initial_b, alpha, 
    iterations, compute_cost, compute_gradient
)

print(f"w,b found by gradient descent: {w_final:.4f},{b_final:.4f}")

# Plotting the data and the linear fit
plt.figure(figsize=(10, 6))
plt.scatter(x_train, y_train, marker='x', c='r', label='Training Data')
plt.plot(x_train, w_final * x_train + b_final, label='Linear Regression')
plt.title("Housing Prices")
plt.ylabel('Price (in 1000s of dollars)')
plt.xlabel('Size (1000 sqft)')
plt.legend()
plt.show()

# Plotting the convergence of cost
plt.figure(figsize=(10, 6))
plt.plot(J_hist)
plt.title("Convergence of Cost Function")
plt.ylabel('Cost')
plt.xlabel('Iteration')
plt.show()`}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="classification">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Logistic Regression for Classification</CardTitle>
                <CardDescription>
                  Implementation of logistic regression for binary classification tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-secondary/20 p-4 rounded-md">
                    <h4 className="font-medium mb-2">1. Sigmoid Function</h4>
                    <div className="rounded-md overflow-hidden">
                      <SyntaxHighlighter
                        language="python"
                        style={vscDarkPlus}
                        customStyle={{ margin: 0, borderRadius: '0.375rem' }}
                        wrapLines={true}
                      >
{`import numpy as np
import matplotlib.pyplot as plt

def sigmoid(z):
    """
    Compute the sigmoid of z

    Args:
        z (ndarray): A scalar or numpy array of any size.

    Returns:
        g (ndarray): sigmoid(z), with the same shape as z
    """
    
    g = 1 / (1 + np.exp(-z))
    
    return g`}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                  
                  <div className="bg-secondary/20 p-4 rounded-md">
                    <h4 className="font-medium mb-2">2. Cost Function for Logistic Regression</h4>
                    <div className="rounded-md overflow-hidden">
                      <SyntaxHighlighter
                        language="python"
                        style={vscDarkPlus}
                        customStyle={{ margin: 0, borderRadius: '0.375rem' }}
                        wrapLines={true}
                      >
{`def compute_cost(X, y, w, b):
    """
    Computes the cost over all examples
    Args:
      X : (ndarray Shape (m,n)) data, m examples by n features
      y : (ndarray Shape (m,))  target value 
      w : (ndarray Shape (n,))  values of parameters of the model      
      b : (scalar)              value of bias parameter of the model
    Returns:
      total_cost : (scalar) cost 
    """

    m, n = X.shape
    
    # Compute the model output
    z = np.dot(X, w) + b
    f_wb = sigmoid(z)
    
    # Calculate cost using the logistic regression cost function
    total_cost = 0
    for i in range(m):
        if y[i] == 1:
            total_cost += -np.log(f_wb[i])
        else:
            total_cost += -np.log(1 - f_wb[i])
            
    total_cost = total_cost / m
    
    return total_cost`}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                  
                  <div className="bg-secondary/20 p-4 rounded-md">
                    <h4 className="font-medium mb-2">3. Gradient Computation</h4>
                    <div className="rounded-md overflow-hidden">
                      <SyntaxHighlighter
                        language="python"
                        style={vscDarkPlus}
                        customStyle={{ margin: 0, borderRadius: '0.375rem' }}
                        wrapLines={true}
                      >
{`def compute_gradient(X, y, w, b):
    """
    Computes the gradient for logistic regression
    Args:
      X : (ndarray Shape (m,n)) data, m examples by n features
      y : (ndarray Shape (m,))  target value 
      w : (ndarray Shape (n,))  values of parameters of the model      
      b : (scalar)              value of bias parameter of the model
    Returns
      dj_dw : (ndarray Shape (n,)) The gradient of the cost w.r.t. the parameters w
      dj_db : (scalar)             The gradient of the cost w.r.t. the parameter b
    """
    m, n = X.shape
    
    # Initialize gradients
    dj_dw = np.zeros(w.shape)
    dj_db = 0.
    
    # Model prediction
    z = np.dot(X, w) + b
    f_wb = sigmoid(z)
    
    # Compute gradients
    for i in range(m):
        # Error term for each example
        error = f_wb[i] - y[i]
        
        # Gradient for bias term
        dj_db += error
        
        # Gradient for each feature
        for j in range(n):
            dj_dw[j] += error * X[i, j]
            
    # Average over all examples
    dj_dw = dj_dw / m
    dj_db = dj_db / m
    
    return dj_dw, dj_db`}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                  
                  <div className="bg-secondary/20 p-4 rounded-md">
                    <h4 className="font-medium mb-2">4. Decision Boundary Visualization</h4>
                    <div className="rounded-md overflow-hidden">
                      <SyntaxHighlighter
                        language="python"
                        style={vscDarkPlus}
                        customStyle={{ margin: 0, borderRadius: '0.375rem' }}
                        wrapLines={true}
                      >
{`# Plot the decision boundary
def plot_decision_boundary(w, b, X, y):
    """
    Plots the data and the decision boundary based on the trained model
    Args:
      w : (ndarray Shape (n,)) model parameters  
      b : (scalar)             model parameter 
      X : (ndarray Shape (m,n)) data, m examples by n features
      y : (ndarray Shape (m,))  target value 
    """
    
    # Find min and max values for x1 and x2
    x1_min, x1_max = X[:, 0].min() - 1, X[:, 0].max() + 1
    x2_min, x2_max = X[:, 1].min() - 1, X[:, 1].max() + 1
    
    # Create a meshgrid
    xx1, xx2 = np.meshgrid(np.arange(x1_min, x1_max, 0.02),
                         np.arange(x2_min, x2_max, 0.02))
    
    # Get predictions for all points in the meshgrid
    Z = sigmoid(np.dot(np.c_[xx1.ravel(), xx2.ravel()], w) + b)
    Z = Z.reshape(xx1.shape)
    
    # Plot the contour
    plt.figure(figsize=(10, 8))
    plt.contourf(xx1, xx2, Z, alpha=0.3, levels=[0, 0.5, 1], colors=['#f0f0f0', '#4c72b0'])
    plt.contour(xx1, xx2, Z, colors='k', linewidths=1, levels=[0.5])
    
    # Plot the original data points
    plt.scatter(X[:, 0][y==0], X[:, 1][y==0], c='red', marker='x', label='Class 0')
    plt.scatter(X[:, 0][y==1], X[:, 1][y==1], c='blue', marker='o', label='Class 1')
    
    plt.xlabel('Feature 1')
    plt.ylabel('Feature 2')
    plt.title('Logistic Regression Decision Boundary')
    plt.legend()
    plt.show()`}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="neural-networks">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Neural Network Implementation</CardTitle>
                <CardDescription>
                  Building and training neural networks for complex tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-secondary/20 p-4 rounded-md">
                    <h4 className="font-medium mb-2">1. TensorFlow Sequential Model</h4>
                    <div className="rounded-md overflow-hidden">
                      <SyntaxHighlighter
                        language="python"
                        style={vscDarkPlus}
                        customStyle={{ margin: 0, borderRadius: '0.375rem' }}
                        wrapLines={true}
                      >
{`import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt

def sequential_model():
    """
    Creates a sequential model with dense layers
    
    Returns:
      tf.keras.Sequential
    """
    model = tf.keras.Sequential(
        [
            tf.keras.layers.Dense(25, activation='relu'),
            tf.keras.layers.Dense(15, activation='relu'),
            tf.keras.layers.Dense(1, activation='sigmoid')
        ]
    )
    return model

# Create and compile the model
model = sequential_model()
model.compile(
    loss=tf.keras.losses.BinaryCrossentropy(),
    optimizer=tf.keras.optimizers.Adam(0.01),
    metrics=['accuracy']
)

# Print model summary
model.summary()`}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                  
                  <div className="bg-secondary/20 p-4 rounded-md">
                    <h4 className="font-medium mb-2">2. Training a Neural Network</h4>
                    <div className="rounded-md overflow-hidden">
                      <SyntaxHighlighter
                        language="python"
                        style={vscDarkPlus}
                        customStyle={{ margin: 0, borderRadius: '0.375rem' }}
                        wrapLines={true}
                      >
{`# Generate some sample data
np.random.seed(42)
X = np.random.randn(1000, 5)  # 1000 examples with 5 features
y = (X[:, 0] + X[:, 1] > 0).astype(int)  # Binary classification task

# Split data into training and validation sets
from sklearn.model_selection import train_test_split
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
history = model.fit(
    X_train, y_train,
    epochs=50,
    batch_size=32,
    validation_data=(X_val, y_val),
    verbose=1
)

# Plot training & validation accuracy over time
plt.figure(figsize=(12, 5))
plt.subplot(1, 2, 1)
plt.plot(history.history['accuracy'])
plt.plot(history.history['val_accuracy'])
plt.title('Model accuracy')
plt.ylabel('Accuracy')
plt.xlabel('Epoch')
plt.legend(['Train', 'Validation'], loc='lower right')

# Plot training & validation loss over time
plt.subplot(1, 2, 2)
plt.plot(history.history['loss'])
plt.plot(history.history['val_loss'])
plt.title('Model loss')
plt.ylabel('Loss')
plt.xlabel('Epoch')
plt.legend(['Train', 'Validation'], loc='upper right')
plt.tight_layout()
plt.show()`}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                  
                  <div className="bg-secondary/20 p-4 rounded-md">
                    <h4 className="font-medium mb-2">3. Multiclass Classification with Neural Networks</h4>
                    <div className="rounded-md overflow-hidden">
                      <SyntaxHighlighter
                        language="python"
                        style={vscDarkPlus}
                        customStyle={{ margin: 0, borderRadius: '0.375rem' }}
                        wrapLines={true}
                      >
{`# Load the MNIST dataset
mnist = tf.keras.datasets.mnist
(x_train, y_train), (x_test, y_test) = mnist.load_data()

# Normalize the data
x_train = x_train / 255.0
x_test = x_test / 255.0

# Build a model for multiclass classification
model = tf.keras.Sequential([
    tf.keras.layers.Flatten(input_shape=(28, 28)),  # Convert 28x28 images to 1D array
    tf.keras.layers.Dense(128, activation='relu'),  # Hidden layer with 128 neurons
    tf.keras.layers.Dropout(0.2),                   # Dropout for regularization
    tf.keras.layers.Dense(10, activation='softmax')  # Output layer with 10 classes (digits 0-9)
])

# Compile the model
model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# Train the model
model.fit(x_train, y_train, epochs=5, validation_data=(x_test, y_test))

# Evaluate the model on test data
test_loss, test_acc = model.evaluate(x_test, y_test, verbose=2)
print(f'\nTest accuracy: {test_acc}')`}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                  
                  <div className="bg-secondary/20 p-4 rounded-md">
                    <h4 className="font-medium mb-2">4. Visualizing Predictions</h4>
                    <div className="rounded-md overflow-hidden">
                      <SyntaxHighlighter
                        language="python"
                        style={vscDarkPlus}
                        customStyle={{ margin: 0, borderRadius: '0.375rem' }}
                        wrapLines={true}
                      >
{`# Make predictions
predictions = model.predict(x_test)

# Plot some examples
def plot_image(i, predictions_array, true_label, img):
    true_label, img = true_label[i], img[i]
    plt.grid(False)
    plt.xticks([])
    plt.yticks([])
    
    plt.imshow(img, cmap=plt.cm.binary)
    
    predicted_label = np.argmax(predictions_array[i])
    if predicted_label == true_label:
        color = 'blue'
    else:
        color = 'red'
        
    plt.xlabel(
        f"Predicted: {predicted_label} ({100*np.max(predictions_array[i]):0.1f}%)\n"
        f"True: {true_label}",
        color=color
    )

def plot_value_array(i, predictions_array, true_label):
    true_label = true_label[i]
    plt.grid(False)
    plt.xticks(range(10))
    plt.yticks([])
    thisplot = plt.bar(range(10), predictions_array[i], color="#777777")
    plt.ylim([0, 1])
    predicted_label = np.argmax(predictions_array[i])
    
    thisplot[predicted_label].set_color('red')
    thisplot[true_label].set_color('blue')
    
# Plot the first X test images, their predictions, and the true labels
num_rows = 5
num_cols = 3
num_images = num_rows*num_cols
plt.figure(figsize=(2*2*num_cols, 2*num_rows))
for i in range(num_images):
    plt.subplot(num_rows, 2*num_cols, 2*i+1)
    plot_image(i, predictions, y_test, x_test)
    plt.subplot(num_rows, 2*num_cols, 2*i+2)
    plot_value_array(i, predictions, y_test)
plt.tight_layout()
plt.show()`}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="reinforcement">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Reinforcement Learning</CardTitle>
                <CardDescription>
                  Implementation of reinforcement learning algorithms for training agents in interactive environments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-secondary/20 p-4 rounded-md">
                    <h4 className="font-medium mb-2">1. Q-Learning Algorithm</h4>
                    <div className="rounded-md overflow-hidden">
                      <SyntaxHighlighter
                        language="python"
                        style={vscDarkPlus}
                        customStyle={{ margin: 0, borderRadius: '0.375rem' }}
                        wrapLines={true}
                      >
{`import numpy as np
import random
import matplotlib.pyplot as plt

def q_learning(env, num_episodes, alpha=0.1, gamma=0.99, epsilon=1.0, 
               epsilon_decay=0.995, min_epsilon=0.01):
    """
    Implements the Q-learning algorithm
    
    Args:
        env: Environment that follows OpenAI Gym interface
        num_episodes (int): Number of episodes to train
        alpha (float): Learning rate
        gamma (float): Discount factor
        epsilon (float): Initial exploration rate
        epsilon_decay (float): Decay rate for exploration
        min_epsilon (float): Minimum exploration rate
        
    Returns:
        q_table (ndarray): The learned Q-table
    """
    # Get state and action space sizes
    state_size = env.observation_space.n
    action_size = env.action_space.n
    
    # Initialize Q-table with zeros
    q_table = np.zeros((state_size, action_size))
    
    # Track rewards per episode
    rewards = []
    
    # Training loop
    for episode in range(num_episodes):
        # Reset the environment and get initial state
        state = env.reset()
        done = False
        total_reward = 0
        
        # Episode loop
        while not done:
            # Epsilon-greedy action selection
            if random.uniform(0, 1) < epsilon:
                # Explore: random action
                action = env.action_space.sample()
            else:
                # Exploit: best known action
                action = np.argmax(q_table[state, :])
            
            # Take action and observe next state and reward
            next_state, reward, done, _ = env.step(action)
            
            # Q-learning update
            best_next_action = np.argmax(q_table[next_state, :])
            td_target = reward + gamma * q_table[next_state, best_next_action] * (not done)
            td_error = td_target - q_table[state, action]
            q_table[state, action] += alpha * td_error
            
            # Update state and total reward
            state = next_state
            total_reward += reward
        
        # Decay epsilon
        epsilon = max(min_epsilon, epsilon * epsilon_decay)
        
        # Record reward
        rewards.append(total_reward)
        
        # Print progress
        if (episode + 1) % 100 == 0:
            avg_reward = np.mean(rewards[-100:])
            print(f"Episode {episode+1}/{num_episodes}, Avg Reward: {avg_reward:.2f}, Epsilon: {epsilon:.4f}")
    
    return q_table, rewards`}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                  
                  <div className="bg-secondary/20 p-4 rounded-md">
                    <h4 className="font-medium mb-2">2. Deep Q-Network (DQN) Implementation</h4>
                    <div className="rounded-md overflow-hidden">
                      <SyntaxHighlighter
                        language="python"
                        style={vscDarkPlus}
                        customStyle={{ margin: 0, borderRadius: '0.375rem' }}
                        wrapLines={true}
                      >
{`import tensorflow as tf
import numpy as np
from collections import deque
import random

class DQNAgent:
    def __init__(self, state_size, action_size):
        self.state_size = state_size
        self.action_size = action_size
        self.memory = deque(maxlen=100000)  # Experience replay buffer
        self.gamma = 0.99                   # Discount factor
        self.epsilon = 1.0                  # Exploration rate
        self.epsilon_min = 0.01             # Minimum exploration rate
        self.epsilon_decay = 0.995          # Exploration decay rate
        self.learning_rate = 0.001          # Learning rate
        
        # Main model (for training)
        self.model = self._build_model()
        
        # Target model (for stable Q-values)
        self.target_model = self._build_model()
        self.update_target_model()
    
    def _build_model(self):
        """Builds a neural network model for deep Q-learning"""
        model = tf.keras.Sequential([
            tf.keras.layers.Dense(64, activation='relu', input_dim=self.state_size),
            tf.keras.layers.Dense(64, activation='relu'),
            tf.keras.layers.Dense(self.action_size, activation='linear')
        ])
        model.compile(loss='mse', optimizer=tf.keras.optimizers.Adam(lr=self.learning_rate))
        return model
    
    def update_target_model(self):
        """Copies weights from main model to target model"""
        self.target_model.set_weights(self.model.get_weights())
    
    def remember(self, state, action, reward, next_state, done):
        """Stores experience in replay memory"""
        self.memory.append((state, action, reward, next_state, done))
    
    def act(self, state, training=True):
        """Selects action using epsilon-greedy policy"""
        if training and np.random.rand() <= self.epsilon:
            # Explore: choose random action
            return random.randrange(self.action_size)
        
        # Exploit: choose best action based on Q-values
        act_values = self.model.predict(state)
        return np.argmax(act_values[0])
    
    def replay(self, batch_size):
        """Trains the model using experience replay"""
        if len(self.memory) < batch_size:
            return
        
        # Sample random batch from memory
        minibatch = random.sample(self.memory, batch_size)
        
        for state, action, reward, next_state, done in minibatch:
            target = reward
            if not done:
                # Use target network for next Q-values to stabilize training
                target = reward + self.gamma * np.amax(self.target_model.predict(next_state)[0])
            
            # Current Q-values
            target_f = self.model.predict(state)
            # Update Q-value for the action taken
            target_f[0][action] = target
            
            # Train the model
            self.model.fit(state, target_f, epochs=1, verbose=0)
        
        # Decay epsilon
        if self.epsilon > self.epsilon_min:
            self.epsilon *= self.epsilon_decay`}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                  
                  <div className="bg-secondary/20 p-4 rounded-md">
                    <h4 className="font-medium mb-2">3. Training a Lunar Lander with DQN</h4>
                    <div className="rounded-md overflow-hidden">
                      <SyntaxHighlighter
                        language="python"
                        style={vscDarkPlus}
                        customStyle={{ margin: 0, borderRadius: '0.375rem' }}
                        wrapLines={true}
                      >
{`import gym
import numpy as np
import matplotlib.pyplot as plt

# Create the Lunar Lander environment
env = gym.make('LunarLander-v2')

# Get environment dimensions
state_size = env.observation_space.shape[0]  # 8 state dimensions
action_size = env.action_space.n  # 4 discrete actions

# Create agent
agent = DQNAgent(state_size, action_size)

# Training parameters
batch_size = 64
n_episodes = 1000
output_freq = 50
target_update_freq = 10

# Training loop
scores = []

for e in range(n_episodes):
    # Reset the environment
    state = env.reset()
    state = np.reshape(state, [1, state_size])
    
    # Initialize variables for this episode
    done = False
    time = 0
    total_reward = 0
    
    # Episode loop
    while not done:
        # Select action
        action = agent.act(state)
        
        # Take action and observe result
        next_state, reward, done, _ = env.step(action)
        next_state = np.reshape(next_state, [1, state_size])
        
        # Remember experience
        agent.remember(state, action, reward, next_state, done)
        
        # Update state and score
        state = next_state
        total_reward += reward
        time += 1
        
        # Train the agent with a random batch from memory
        agent.replay(batch_size)
    
    # Update target network periodically
    if e % target_update_freq == 0:
        agent.update_target_model()
    
    # Track scores
    scores.append(total_reward)
    
    # Print progress
    if (e + 1) % output_freq == 0:
        avg_score = np.mean(scores[-output_freq:])
        print(f"Episode {e+1}/{n_episodes}, Score: {total_reward:.2f}, Avg Score: {avg_score:.2f}, Epsilon: {agent.epsilon:.4f}")

# Plot training progress
plt.figure(figsize=(10, 6))
plt.plot(scores)
plt.plot(np.convolve(scores, np.ones(100)/100, mode='valid'), 'r')  # Moving average
plt.title('Training Progress')
plt.xlabel('Episode')
plt.ylabel('Score')
plt.show()

# Save the trained model
agent.model.save("lunar_lander_dqn.h5")`}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                  
                  <div className="bg-secondary/20 p-4 rounded-md">
                    <h4 className="font-medium mb-2">4. Visualizing the Trained Agent</h4>
                    <div className="rounded-md overflow-hidden">
                      <SyntaxHighlighter
                        language="python"
                        style={vscDarkPlus}
                        customStyle={{ margin: 0, borderRadius: '0.375rem' }}
                        wrapLines={true}
                      >
{`# Testing the agent
def test_agent(env, agent, n_episodes=5, render=True):
    """Tests the agent on several episodes and optionally renders the environment"""
    scores = []
    
    for episode in range(n_episodes):
        state = env.reset()
        state = np.reshape(state, [1, state_size])
        done = False
        total_reward = 0
        
        while not done:
            if render:
                env.render()
            
            # Agent chooses action (no exploration)
            action = agent.act(state, training=False)
            
            # Take action
            next_state, reward, done, _ = env.step(action)
            next_state = np.reshape(next_state, [1, state_size])
            
            # Update state and score
            state = next_state
            total_reward += reward
        
        scores.append(total_reward)
        print(f"Episode {episode+1}, Score: {total_reward:.2f}")
    
    env.close()
    return scores

# Test the trained agent
test_scores = test_agent(env, agent, n_episodes=5, render=True)
print(f"Average Test Score: {np.mean(test_scores):.2f}")`}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          These code examples are adapted from the Machine Learning Specialization coursework.
          For complete implementations, visit the <a href="https://github.com/YKaanKaya/Machine-learning" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">GitHub repository</a>.
        </p>
      </div>
    </div>
  )
} 