# 导入必备库
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np
from scipy import stats
import statsmodels.api as sm

# -------------------------- 步骤1：构建核心数据集 --------------------------
data = {
    'Use_T': [5,3,2,2,4,4,3,2,4,5,2,3,3,4,2,3,3,5],  # 使用时长
    'Interact': [1,4,1,2,4,1,2,4,3,2,3,5,2,1,4,4,4,1],  # 交流频率
    'Learn': [1,2,1,3,2,1,3,5,4,2,4,3,2,1,5,2,4,1],  # 学习目的
    'Depend': [5,2,5,2,3,4,2,1,4,5,1,2,3,4,1,2,2,5],  # 依赖程度
    'Extra': [2,4,2,2,2,2,2,4,3,1,3,5,3,2,4,4,2,1],  # 外向性
    'Neuro': [5,2,5,3,3,4,2,1,2,5,2,2,3,4,1,3,2,5],  # 神经质
    'Open': [2,3,2,3,3,2,2,5,4,1,4,3,3,2,5,3,4,1],  # 开放性
    'Consc': [1,3,1,2,3,2,3,5,4,1,4,3,2,1,5,3,4,1],  # 尽责性
    'Agree': [3,4,3,3,4,2,2,5,3,2,4,5,3,2,4,5,4,2]   # 宜人性
}
df = pd.DataFrame(data)

# -------------------------- Step 2: Descriptive Statistics Bar Chart --------------------------
plt.rcParams['font.sans-serif'] = ['Arial']  # Use standard font for English
plt.rcParams['axes.unicode_minus'] = False
plt.figure(figsize=(12, 6))
variables = ['Use_T', 'Interact', 'Learn', 'Depend', 'Extra', 'Neuro', 'Open', 'Consc', 'Agree']
labels = ['Usage Duration', 'Interaction Frequency', 'Learning Purpose', 'Dependence Level', 'Extraversion', 'Neuroticism', 'Openness', 'Conscientiousness', 'Agreeableness']
desc_stats = df.describe().T[['mean', 'std']]
means = [desc_stats.loc[var, 'mean'] for var in variables]
stds = [desc_stats.loc[var, 'std'] for var in variables]

x = np.arange(len(labels))
bars = plt.bar(x, means, width=0.6, yerr=stds, capsize=5, color=['#1f77b4']*4 + ['#ff7f0e']*5)
for bar in bars:
    height = bar.get_height()
    plt.text(bar.get_x() + bar.get_width()/2., height + 0.1, f'{height:.2f}', ha='center', va='bottom')

plt.title('Descriptive Statistics of Short Video Usage and Personality Dimensions (Mean ± SD)', fontsize=14)
plt.ylabel('Score (5-point scale)', fontsize=12)
plt.xticks(x, labels, rotation=45, ha='right')
plt.ylim(0, 6)
plt.tight_layout()
plt.savefig('Descriptive_Statistics_Bar_Chart.png', dpi=300, bbox_inches='tight')
plt.close()

# -------------------------- Step 3: Correlation Heatmap --------------------------
corr_matrix = df.corr(method='pearson')
# Use English labels for the correlation matrix heatmap
corr_matrix.index = labels
corr_matrix.columns = labels

plt.figure(figsize=(12, 10))
sns.heatmap(corr_matrix, annot=True, cmap='RdBu_r', vmin=-1, vmax=1, fmt='.3f', linewidths=0.5)
plt.title('Correlation Heatmap of Variables (Pearson Coefficient)', fontsize=14)
plt.tight_layout()
plt.savefig('Correlation_Analysis_Heatmap.png', dpi=300, bbox_inches='tight')
plt.close()

# -------------------------- Step 4: Regression Coefficient Chart --------------------------
# Model 1: Neuroticism (Neuro) = Usage Duration + Dependence Level
X1 = sm.add_constant(df[['Use_T', 'Depend']])
model1 = sm.OLS(df['Neuro'], X1).fit()
beta1 = model1.params[1:].values

# Model 2: Openness (Open) = Learning Purpose + Interaction Frequency
X2 = sm.add_constant(df[['Learn', 'Interact']])
model2 = sm.OLS(df['Open'], X2).fit()
beta2 = model2.params[1:].values

# Model 3: Extraversion (Extra) = Interaction Frequency
X3 = sm.add_constant(df[['Interact']])
model3 = sm.OLS(df['Extra'], X3).fit()
beta3 = model3.params[1:].values

# Plotting
all_betas = np.concatenate([beta1, beta2, beta3])
all_vars = [
    'Neuroticism - Usage Duration', 
    'Neuroticism - Dependence Level', 
    'Openness - Learning Purpose', 
    'Openness - Interaction Frequency', 
    'Extraversion - Interaction Frequency'
]
colors = ['#d62728' if b>0 else '#1f77b4' for b in all_betas]

plt.figure(figsize=(10, 5))
bars = plt.bar(all_vars, all_betas, color=colors, width=0.6)
for bar in bars:
    height = bar.get_height()
    plt.text(bar.get_x() + bar.get_width()/2., height + 0.02 if height>0 else height - 0.05,
             f'{height:.3f}', ha='center', va='bottom' if height>0 else 'top')

plt.axhline(y=0, color='black', linestyle='--', linewidth=0.8)
plt.title('Standardized Regression Coefficients of Short Video Usage on Personality Dimensions', fontsize=14)
plt.ylabel('Regression Coefficient β', fontsize=12)
plt.xticks(rotation=45, ha='right')
plt.tight_layout()
plt.savefig('Regression_Analysis_Coefficient_Chart.png', dpi=300, bbox_inches='tight')
plt.close()

print("✅ Chart generation complete! Please check the following PNG files in the code folder:")
print("1. Descriptive_Statistics_Bar_Chart.png")
print("2. Correlation_Analysis_Heatmap.png")
print("3. Regression_Analysis_Coefficient_Chart.png")